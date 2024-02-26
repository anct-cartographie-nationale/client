import { combineLatest, debounceTime, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import {
  countLieuxInCollectiviteTerritoriale,
  onlyDefined,
  DepartementPresentation,
  FrancePresentation,
  RegionPresentation,
  toDepartement,
  toFrance,
  toRegion,
  TypologiePresentation,
  LabelsNationauxPresentation,
  DataInclusionTypologies
} from '../collectivite-territoriale';
import { FilterPresentation } from '../filter';
import { LieuMediationNumeriquePresentation } from './lieu-mediation-numerique.presentation';
import { byBoundingBox } from './helpers/bounding-box';
import { byDistance, filteredLieuxMediationNumerique } from './helpers/filter';
import { DispositifProgrammeNational, LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ResultFoundPresentation, Searchable } from '../../../adresse';
import { NO_LOCALISATION } from '../../models';
import { WithLieuxCount } from '../collectivite-territoriale';

type LieuxMediationNumeriqueFilterParameters = [LieuMediationNumerique[], Localisation, FilterPresentation];

const LIEUX_ZOOM_LEVEL: number = 9;
const MAP_INTERACTION_DEBOUNCE_TIME: number = 300;

const toLieuxMediationNumeriqueByDistance =
  (date: Date) =>
  ([boundingBox, lieux, localisation, filters, zoomLevel]: [
    [Localisation, Localisation],
    ...LieuxMediationNumeriqueFilterParameters,
    number
  ]): LieuMediationNumeriquePresentation[] => {
    const stayInLieuxZoom: boolean = filters.distance ? filters.distance >= 50000 && filters.distance <= 100000 : false;
    return zoomLevel < (stayInLieuxZoom || window.innerWidth <= 1400 ? LIEUX_ZOOM_LEVEL - 1 : LIEUX_ZOOM_LEVEL)
      ? []
      : filteredLieuxMediationNumerique(lieux.filter(byBoundingBox(boundingBox)), localisation, filters, date).sort(byDistance);
  };

const toLieuxMediationNumeriqueByDepartement =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): WithLieuxCount<DepartementPresentation[]> =>
    ((lieux: LieuMediationNumeriquePresentation[]): WithLieuxCount<DepartementPresentation[]> => ({
      payload: lieux
        .map(toDepartement)
        .filter(onlyDefined)
        .reduce(countLieuxInCollectiviteTerritoriale as () => DepartementPresentation[], []),
      lieuxCount: lieux.length
    }))(filteredLieuxMediationNumerique(...filterParameters, date));

const toLieuxMediationNumeriqueByRegion =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): WithLieuxCount<RegionPresentation[]> =>
    ((lieux: LieuMediationNumeriquePresentation[]): WithLieuxCount<RegionPresentation[]> => ({
      payload: lieux
        .map(toRegion)
        .filter(onlyDefined)
        .reduce(countLieuxInCollectiviteTerritoriale as () => RegionPresentation[], []),
      lieuxCount: lieux.length
    }))(filteredLieuxMediationNumerique(...filterParameters, date));

const getTypologieType = (lieu: { typologies?: string }, type: string): boolean => {
  if (!lieu.typologies) {
    return false;
  }
  const typologiesArray = lieu.typologies
    .toString()
    .split(',')
    .map((typologie) => typologie.trim());

  return typologiesArray.every((typologie) => {
    const typologieInfo = DataInclusionTypologies[typologie as keyof typeof DataInclusionTypologies];
    return typologieInfo && typologieInfo.type === type;
  });
};

const getTypologieSubType = (lieu: { typologies?: string }, subtype: string): boolean => {
  if (!lieu.typologies) {
    return false;
  }
  const typologiesArray = lieu.typologies
    .toString()
    .split(',')
    .map((typologie) => typologie.trim());

  return typologiesArray.every((typologie) => {
    const typologieInfo = DataInclusionTypologies[typologie as keyof typeof DataInclusionTypologies];
    return typologieInfo && typologieInfo.type === 'publique' && typologieInfo.subtype === subtype;
  });
};

const getLieuxCountPercentage = (typeCount: number, totalLieux: number): string =>
  `${((typeCount / totalLieux) * 100).toFixed(0)} %`;

const toLieuxMediationNumeriqueByTypologie =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): TypologiePresentation[] => {
    const filteredLieux = filteredLieuxMediationNumerique(...filterParameters, date).filter(onlyDefined);

    const assoCount = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieType(lieu, 'association'))
      .filter(Boolean).length;
    const acteurPrives = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieType(lieu, 'privee'))
      .filter(Boolean).length;
    const publicCount = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieType(lieu, 'publique'))
      .filter(Boolean).length;
    const communeCount = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieSubType(lieu, 'commune'))
      .filter(Boolean).length;
    const EpciCount = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieSubType(lieu, 'epci'))
      .filter(Boolean).length;
    const departementCount = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieSubType(lieu, 'departement'))
      .filter(Boolean).length;
    const othersCount = filteredLieux
      .map((lieu: LieuMediationNumeriquePresentation) => getTypologieSubType(lieu, 'autre'))
      .filter(Boolean).length;
    const totalLieux = filteredLieux.length;
    const notDefinedLieux = totalLieux - (assoCount + acteurPrives + publicCount);
    const publicNotDefinedLieux = publicCount - (communeCount + EpciCount + departementCount + othersCount);

    return [
      {
        nom: 'Public',
        type: 'publique',
        lieuxCount: publicCount,
        lieuxPercentage: getLieuxCountPercentage(publicCount, totalLieux)
      },
      {
        nom: 'Commune',
        type: 'publique',
        sousType: 'commune',
        lieuxCount: communeCount,
        lieuxPercentage: getLieuxCountPercentage(communeCount, publicCount)
      },
      {
        nom: 'EPCI',
        type: 'publique',
        sousType: 'epci',
        lieuxCount: EpciCount,
        lieuxPercentage: getLieuxCountPercentage(EpciCount, publicCount)
      },
      {
        nom: 'Departement',
        type: 'publique',
        sousType: 'departement',
        lieuxCount: departementCount,
        lieuxPercentage: getLieuxCountPercentage(departementCount, publicCount)
      },
      {
        nom: 'Autre',
        type: 'publique',
        sousType: 'autre',
        lieuxCount: othersCount,
        lieuxPercentage: getLieuxCountPercentage(othersCount, publicCount)
      },
      {
        nom: 'Non Défini',
        type: 'publique',
        sousType: 'non défini',
        lieuxCount: publicNotDefinedLieux,
        lieuxPercentage: getLieuxCountPercentage(publicNotDefinedLieux, publicCount)
      },
      {
        nom: 'Associations',
        lieuxCount: assoCount,
        lieuxPercentage: getLieuxCountPercentage(assoCount, totalLieux)
      },
      {
        nom: 'Autre acteurs privés',
        lieuxCount: acteurPrives,
        lieuxPercentage: getLieuxCountPercentage(acteurPrives, totalLieux)
      },
      {
        nom: 'Non défini',
        lieuxCount: notDefinedLieux,
        lieuxPercentage: getLieuxCountPercentage(notDefinedLieux, totalLieux)
      }
    ];
  };

const toLieuxMediationNumeriqueByLabelsNationaux =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): LabelsNationauxPresentation[] => {
    const filteredLieux = filteredLieuxMediationNumerique(...filterParameters, date).filter(onlyDefined);
    const lieuxByLabelsNationaux: LabelsNationauxPresentation[] = filteredLieux.reduce<LabelsNationauxPresentation[]>(
      (acc, lieu) => {
        const dispositifProgrammesNationaux: string[] | undefined = lieu.dispositif_programmes_nationaux
          ?.toString()
          .split(',')
          .map((label) => label.trim());

        const autresFormationsLabels: string[] | undefined = lieu.autres_formations_labels
          ?.toString()
          .split(',')
          .map((label) => label.trim());

        dispositifProgrammesNationaux?.some((dispositifProgrammeNational: string) => {
          if (!dispositifProgrammeNational) return;
          const existingLabel: LabelsNationauxPresentation | undefined = acc.find((item: LabelsNationauxPresentation) =>
            dispositifProgrammeNational?.includes(item.nom as DispositifProgrammeNational)
          );
          if (existingLabel) {
            existingLabel.lieuxCount = (existingLabel.lieuxCount || 0) + 1;
          } else {
            acc.push({
              nom: dispositifProgrammeNational,
              lieuxCount: 1
            });
          }
        });

        autresFormationsLabels
          ?.filter((label: string) => label.includes('QPV') || label.includes('ZRR'))
          .some((labelAutre: string) => {
            if (!labelAutre) return;
            const existingLabelAutre: LabelsNationauxPresentation | undefined = acc.find(
              (item: LabelsNationauxPresentation) => labelAutre === item.nom
            );
            if (existingLabelAutre) {
              existingLabelAutre.lieuxCount = (existingLabelAutre.lieuxCount || 0) + 1;
            } else {
              acc.push({
                nom: labelAutre,
                lieuxCount: 1
              });
            }
          });
        return acc;
      },
      []
    );

    lieuxByLabelsNationaux.map((label) => {
      label.lieuxPercentage = (((label.lieuxCount || 0) / filteredLieux.length) * 100).toFixed(0);
    });

    return lieuxByLabelsNationaux;
  };

const toLieuxMediationNumeriqueFrance =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters) =>
    ((lieux: LieuMediationNumeriquePresentation[]): WithLieuxCount<FrancePresentation[]> => ({
      payload: lieux
        .map(toFrance)
        .filter(onlyDefined)
        .reduce(countLieuxInCollectiviteTerritoriale as () => FrancePresentation[], []),
      lieuxCount: lieux.length
    }))(filteredLieuxMediationNumerique(...filterParameters, date));

const toResultFound = ({
  id,
  adresse,
  nom,
  localisation
}: LieuMediationNumerique & {
  localisation: Localisation;
}): ResultFoundPresentation<{ id: string; type: 'place' }> => ({
  id: id,
  context: `${adresse.voie} ${adresse.code_postal}, ${adresse.commune}`,
  label: nom,
  payload: { id, type: 'place' },
  localisation
});

const onlyNomMatching =
  (searchTerm: string) =>
  (
    lieu: LieuMediationNumerique
  ): lieu is LieuMediationNumerique & {
    localisation: Localisation;
  } =>
    lieu.nom.toLowerCase().includes(searchTerm.toLowerCase()) && lieu.localisation != null;

const onlyAdresseMatching =
  (searchTerm: string) =>
  (
    lieu: LieuMediationNumerique
  ): lieu is LieuMediationNumerique & {
    localisation: Localisation;
  } =>
    `${lieu.adresse.voie} ${lieu.adresse.commune}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    lieu.localisation != null;

const appendSearchByAdresse = (
  matchingByName: ResultFoundPresentation<{
    id: string;
    type: 'place';
  }>[],
  lieux: LieuMediationNumerique[],
  searchTerm: string
): ResultFoundPresentation<{
  id: string;
  type: 'place';
}>[] => [
  ...matchingByName,
  ...lieux
    .filter(onlyAdresseMatching(searchTerm))
    .slice(0, 5 - matchingByName.length)
    .map(toResultFound)
];

export class LieuxMediationNumeriquePresenter implements Searchable<{ id: string; type: 'place' }> {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION]),
    zoomLevel$: Observable<number> = of(LIEUX_ZOOM_LEVEL)
  ): Observable<LieuMediationNumeriquePresentation[]> {
    return combineLatest([boundingBox$, this.lieuxMediationNumerique$, localisation$, filter$, zoomLevel$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByDistance(date))
    );
  }

  public lieuxMediationNumeriqueByDepartement$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<WithLieuxCount<DepartementPresentation[]>> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByDepartement(date))
    );
  }

  public lieuxMediationNumeriqueByRegion$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<WithLieuxCount<RegionPresentation[]>> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByRegion(date))
    );
  }

  public lieuxMediationNumeriqueByTypologie$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<TypologiePresentation[]> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByTypologie(date))
    );
  }

  public lieuxMediationNumeriqueByLabelsNationaux$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<LabelsNationauxPresentation[]> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByLabelsNationaux(date))
    );
  }

  public lieuxMediationNumeriqueFrance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<WithLieuxCount<FrancePresentation[]>> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueFrance(date))
    );
  }

  public search$(
    searchTerm: string,
    fromOrientation?: boolean,
    limit: number = 5
  ): Observable<ResultFoundPresentation<{ id: string; type: 'place' }>[]> {
    return fromOrientation
      ? of([])
      : this.lieuxMediationNumerique$.pipe(
          map((lieux: LieuMediationNumerique[]): ResultFoundPresentation<{ id: string; type: 'place' }>[] => {
            const matchingByName: ResultFoundPresentation<{ id: string; type: 'place' }>[] = lieux
              .filter(onlyNomMatching(searchTerm))
              .slice(0, limit)
              .map(toResultFound);

            return matchingByName.length === 5 ? matchingByName : appendSearchByAdresse(matchingByName, lieux, searchTerm);
          })
        );
  }

  // public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> = this.lieuxMediationNumeriqueRepository.getAll$();

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueRepository.getLieuxByPostalCodes$?.(['13080', '13090', '13100', '13290', '13540']) ??
    this.lieuxMediationNumeriqueRepository.getAll$();
}
