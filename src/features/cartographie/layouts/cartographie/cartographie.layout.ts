import { ChangeDetectionStrategy, Component, Inject, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { LngLatBounds, MapLibreEvent } from 'maplibre-gl';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration, ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '../../../../root';
import { NO_LOCALISATION } from '../../../core/models';
import {
  departementFromNom,
  DepartementPresentation,
  FilterPresentation,
  FrancePresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  MarkersPresenter,
  nearestRegion,
  openingState,
  regionFromDepartement,
  RegionPresentation,
  TerritoirePresentation,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  WithLieuxCount
} from '../../../core/presenters';
import { ifAny } from '../../../core/utilities';
import { AddressType, ResultFoundPresentation } from '../../../adresse';
import {
  DEPARTEMENT_ZOOM_LEVEL,
  getNextRouteFromZoomLevel,
  LieuMediationNumeriqueOnMapPresentation,
  shouldNavigateToListPage
} from '../../presenters';
import { cartographieLayoutProviders } from './cartographie.layout.providers';
import { MatomoTracker } from 'ngx-matomo';

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[]
): LieuMediationNumeriquePresentation[] =>
  departement
    ? lieux.filter((lieu: LieuMediationNumeriquePresentation): boolean => toDepartement(lieu)?.code === departement.code)
    : lieux;

const toLieuxFilteredByDepartement = (lieux: LieuMediationNumeriquePresentation[], nomDepartement: string) =>
  filteredByDepartementIfExist(departementFromNom(nomDepartement), lieux);

const toLieuxWithOpeningState =
  (date: Date) =>
  ([lieuxMediationNumerique, zoom]: [LieuMediationNumeriquePresentation[], number]): LieuMediationNumeriquePresentation[] =>
    zoom > DEPARTEMENT_ZOOM_LEVEL
      ? lieuxMediationNumerique.map(
          (lieuMediationNumerique: LieuMediationNumeriquePresentation): LieuMediationNumeriquePresentation => ({
            ...lieuMediationNumerique,
            ...ifAny('status', openingState(date)(lieuMediationNumerique.horaires))
          })
        )
      : lieuxMediationNumerique;

const toLieuxByLongitude = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]) =>
  LieuxMediationNumerique.sort(
    (
      lieuMediationNumeriqueA: LieuMediationNumeriquePresentation,
      lieuMediationNumeriqueB: LieuMediationNumeriquePresentation
    ): number => lieuMediationNumeriqueB.latitude - lieuMediationNumeriqueA.latitude
  );

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie.layout.html',
  providers: cartographieLayoutProviders
})
export class CartographieLayout {
  private _showMapForSmallDevices$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showMapForSmallDevices$: Observable<boolean> = this._showMapForSmallDevices$.asObservable();

  private _currentZoom$: BehaviorSubject<number> = new BehaviorSubject(this._zoomLevel.regular);
  public currentZoom$: Observable<number> = this._currentZoom$.asObservable();

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  private _resultsCount$: Subject<number> = new Subject<number>();
  public resultsCount$: Observable<number> = this._resultsCount$.asObservable();

  private _lieuxMediationNumeriqueListPresenterArgs: [Observable<Localisation>, Observable<FilterPresentation>, Date] = [
    this.route.queryParams.pipe(
      map((queryParams: Params) => toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(queryParams)))
    ),
    this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
    new Date()
  ];

  public france$: Observable<WithLieuxCount<FrancePresentation[]>> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueFrance$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      tap(({ lieuxCount }: WithLieuxCount<FrancePresentation[]>): void => {
        this._loadingState$.next(false);
        this._resultsCount$.next(lieuxCount);
      })
    );

  public regions$: Observable<WithLieuxCount<RegionPresentation[]>> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByRegion$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      tap(({ lieuxCount }: WithLieuxCount<RegionPresentation[]>): void => {
        this._loadingState$.next(false);
        this._resultsCount$.next(lieuxCount);
      })
    );

  public departements$: Observable<WithLieuxCount<DepartementPresentation[]>> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDepartement$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      tap(({ lieuxCount }: WithLieuxCount<DepartementPresentation[]>): void => {
        this._loadingState$.next(false);
        this._resultsCount$.next(lieuxCount);
      })
    );

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueOnMapPresentation[]> = combineLatest([
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      ...this._lieuxMediationNumeriqueListPresenterArgs,
      this.markersPresenter.boundingBox$,
      this.currentZoom$
    ),
    this.route.paramMap
  ]).pipe(
    map(([lieux]: [LieuMediationNumeriquePresentation[], ParamMap]): LieuMediationNumeriquePresentation[] =>
      toLieuxFilteredByDepartement(lieux, this.getRouteParam('nomDepartement'))
    ),
    withLatestFrom(this._currentZoom$),
    map(toLieuxWithOpeningState(new Date())),
    map(toLieuxByLongitude),
    tap((lieux: LieuMediationNumeriquePresentation[]): void => {
      lieux.length > 0 && this._resultsCount$.next(lieux.length);
      this._loadingState$.next(false);
    })
  );

  public allLieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION));

  public defaultAddress$: Observable<string | null> = this.route.queryParamMap.pipe(
    map((paramMap: ParamMap) => paramMap.get('address'))
  );

  public fromOrientation: boolean = Object.keys(this.route.snapshot.queryParams).length > 0;

  private readonly _userLocalisation$: BehaviorSubject<Localisation> = new BehaviorSubject<Localisation>(NO_LOCALISATION);
  public readonly userLocalisation$: Observable<Localisation> = this._userLocalisation$.asObservable();

  @ViewChild(RouterOutlet) public routerOutlet!: RouterOutlet | undefined;

  public currentDepartement?: string;

  public currentRegion?: string;

  public mapIsDragging: boolean = false;

  public updateDragging(): void {
    this.mapIsDragging = false;
  }

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter,
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Optional() private readonly _matomoTracker?: MatomoTracker
  ) {}

  public onShowLieuxInDepartement(departement: TerritoirePresentation): void {
    this.markersPresenter.center(departement.localisation, departement.zoom);
    this.router.navigate(['regions', regionFromDepartement(departement)?.nom, departement.nom], {
      relativeTo: this.route.parent,
      queryParamsHandling: 'preserve'
    });
  }

  public onShowLieuxInRegion(region: TerritoirePresentation): void {
    this.markersPresenter.center(region.localisation, region.zoom);
    this.router.navigate(['regions', region.nom], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
  }

  public onShowLieuxInZone(zone?: TerritoirePresentation): void {
    zone ? this.markersPresenter.center(zone.localisation, zone.zoom) : this.markersPresenter.reset();
  }

  public onShowDetails(lieu: LieuMediationNumeriqueOnMapPresentation): void {
    this.router.navigate([lieu.id, 'details'], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    this.markersPresenter.center(Localisation({ latitude: lieu.latitude, longitude: lieu.longitude }));
    this.markersPresenter.select(lieu.id);
    this.toggleMapForSmallDevices();
  }

  public onHighlight(highlightedId?: string): void {
    this.markersPresenter.highlight(highlightedId ?? '');
  }

  public zooming(value: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) {
    this._currentZoom$.next(value.target.getZoom());
    this.updateMarkers(value.target.getBounds());
  }

  public onMapViewUpdated(value: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>): void {
    const localisation: Localisation = Localisation({
      latitude: value.target.getCenter().lat,
      longitude: value.target.getCenter().lng
    });
    this.markersPresenter.center(localisation, value.target.getZoom());
    this.updateMarkers(value.target.getBounds());
    this.navigateToPageMatchingZoomLevel(value.target.getZoom(), localisation);
  }

  public onMapViewUpdatedDragging(value: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>): void {
    this.mapIsDragging = true;
    const localisation: Localisation = Localisation({
      latitude: value.target.getCenter().lat,
      longitude: value.target.getCenter().lng
    });
    this.markersPresenter.center(localisation, value.target.getZoom());
    this.updateMarkers(value.target.getBounds());
    this.navigateToPageMatchingZoomLevel(value.target.getZoom(), localisation);
  }

  private updateMarkers(bounds: LngLatBounds) {
    this.markersPresenter.boundingBox([
      Localisation({ latitude: bounds.getNorthWest().lat, longitude: bounds.getNorthWest().lng }),
      Localisation({ latitude: bounds.getSouthEast().lat, longitude: bounds.getSouthEast().lng })
    ]);
  }

  public departementZoomForDistance(): number {
    const stayInLieuxZoom: boolean =
      parseInt(this.route.snapshot.queryParams['distance']) >= 50000 &&
      parseInt(this.route.snapshot.queryParams['distance']) <= 100000;
    return stayInLieuxZoom ? 8 : 9;
  }

  private navigateToPageMatchingZoomLevel(zoomLevel: number, localisation: Localisation) {
    const route: string[] = getNextRouteFromZoomLevel(
      zoomLevel,
      nearestRegion(localisation).nom,
      this.route.snapshot.queryParams['distance']
    );

    shouldNavigateToListPage(route, this.route.children[0]?.routeConfig?.path) &&
      this.router.navigate(route, { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
  }

  private getRouteParam(routeParam: string): string {
    return this.route.children[0]?.children[0]?.snapshot.paramMap.get(routeParam) ?? '';
  }

  public onResultFound(result: ResultFoundPresentation<{ id?: string; type: AddressType | 'user' }>): void {
    result.localisation &&
      this.router.navigate(result.payload?.id ? ['/cartographie', result.payload.id, 'details'] : ['/cartographie'], {
        queryParams: {
          address: result.label,
          latitude: result.localisation.latitude,
          longitude: result.localisation.longitude
        },
        queryParamsHandling: 'merge'
      });
    this._userLocalisation$.next(result.localisation);
  }

  public toggleMapForSmallDevices(): void {
    this._showMapForSmallDevices$.next(!this._showMapForSmallDevices$.value);
  }

  public matomoAideButtonTracking(): void {
    this._matomoTracker?.trackEvent('Cartograhie', 'Sidebar', 'Bouton aide');
  }
}
