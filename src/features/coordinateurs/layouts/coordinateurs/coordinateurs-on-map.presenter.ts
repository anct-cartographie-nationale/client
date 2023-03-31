import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import coordinateursData from '../../data/coordinateurs.json';
import {
  CoordinateursFilterPresentation,
  DEFAULT_FILTER,
  onlyBassinDeVie,
  onlyDepartemental,
  toFilteredCoordinateurs
} from '../../presenters';
import { CoordinateurOnMapPresentation } from './coordinateur-on-map.presentation';

export const countCoordinateursDepartementaux = (coordinateurs: CoordinateurOnMapPresentation[]) =>
  coordinateurs.filter(onlyDepartemental).length;

export const countCoordinateursBassinDeVie = (coordinateurs: CoordinateurOnMapPresentation[]) =>
  coordinateurs.filter(onlyBassinDeVie).length;

export class CoordinateursOnMapPresenter {
  public coordinateurs$ = (
    coordinateursFilter$: Observable<CoordinateursFilterPresentation> = of(DEFAULT_FILTER)
  ): Observable<CoordinateurOnMapPresentation[]> =>
    combineLatest([of(coordinateursData as CoordinateurOnMapPresentation[]), coordinateursFilter$]).pipe(
      map(toFilteredCoordinateurs)
    );
}
