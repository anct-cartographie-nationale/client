import { Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '../../../../root';
import { NO_LOCALISATION } from '../../../core';

const isDefinedLocalisation = (topLeftBound: Localisation): boolean => topLeftBound !== NO_LOCALISATION;

const greatestLatitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.latitude > localisation.latitude ? topLeftBound.latitude : localisation.latitude;

const lowestLongitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.longitude < localisation.longitude ? topLeftBound.longitude : localisation.longitude;

const lowestLatitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.latitude < localisation.latitude ? topLeftBound.latitude : localisation.latitude;

const greatestLongitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.longitude > localisation.longitude ? topLeftBound.longitude : localisation.longitude;

const getTopLeftBound = (localisations: Localisation[]) =>
  localisations.reduce(
    (topLeft: Localisation, localisation: Localisation) =>
      Localisation({
        latitude: isDefinedLocalisation(topLeft) ? greatestLatitude(topLeft, localisation) : localisation.latitude,
        longitude: isDefinedLocalisation(topLeft) ? lowestLongitude(topLeft, localisation) : localisation.longitude
      }),
    NO_LOCALISATION
  );

const getBottomRightBound = (localisations: Localisation[]) =>
  localisations.reduce(
    (bottomRight: Localisation, localisation: Localisation) =>
      Localisation({
        latitude: isDefinedLocalisation(bottomRight) ? lowestLatitude(bottomRight, localisation) : localisation.latitude,
        longitude: isDefinedLocalisation(bottomRight) ? greatestLongitude(bottomRight, localisation) : localisation.longitude
      }),
    NO_LOCALISATION
  );

export const getBoundsFromLocalisations = (localisations: Localisation[]): [Localisation, Localisation] => [
  getTopLeftBound(localisations),
  getBottomRightBound(localisations)
];

export class MarkersPresenter {
  private readonly _localisation$: BehaviorSubject<Localisation> = new BehaviorSubject<Localisation>(
    Localisation(this._initialPosition)
  );
  public readonly localisation$: Observable<Localisation> = this._localisation$.asObservable();

  private readonly _zoom$: BehaviorSubject<number> = new BehaviorSubject<number>(this._zoomLevel.regular);
  public readonly zoom$: Observable<number> = this._zoom$.asObservable();

  private readonly _selected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly selected$: Observable<string> = this._selected$.asObservable();

  private readonly _highlighted$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly highlighted$: Observable<string> = this._highlighted$.asObservable();

  private _boundingBox$: BehaviorSubject<[Localisation, Localisation]> = new BehaviorSubject<[Localisation, Localisation]>([
    NO_LOCALISATION,
    NO_LOCALISATION
  ]);
  public boundingBox$: Observable<[Localisation, Localisation]> = this._boundingBox$.asObservable();

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public boundingBox(boundingBox: [Localisation, Localisation]) {
    this._boundingBox$.next(boundingBox);
  }

  public center(localisation: Localisation, zoom: number = this._zoomLevel.userPosition) {
    this._localisation$.next(localisation);
    this._zoom$.next(zoom);
  }

  public select(markerId: string) {
    this._selected$.next(markerId);
  }

  public highlight(markerId: string) {
    this._highlighted$.next(markerId);
  }

  public reset(): void {
    this._localisation$.next(Localisation(this._initialPosition));
    this._zoom$.next(this._zoomLevel.regular);
  }
}
