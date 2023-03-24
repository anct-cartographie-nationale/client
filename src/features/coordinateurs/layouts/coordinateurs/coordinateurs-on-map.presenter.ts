import { Observable, of } from 'rxjs';
import coordinateurs from '../../data/coordinateurs.json';
import { CoordinateurOnMapPresentation } from './coordinateur-on-map.presentation';

export class CoordinateursOnMapPresenter {
  public coordinateurs$(): Observable<CoordinateurOnMapPresentation[]> {
    return of(coordinateurs as CoordinateurOnMapPresentation[]);
  }
}
