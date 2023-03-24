import { Observable, of } from 'rxjs';
import coordinateurs from '../../data/coordinateurs.json';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';

export class CoordinateursListPresenter {
  public coordinateurs$(): Observable<CoordinateursListItemPresentation[]> {
    return of(coordinateurs as CoordinateursListItemPresentation[]);
  }
}
