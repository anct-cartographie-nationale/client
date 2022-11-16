import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '../../../core';
import { AddressFoundPresentation, AddressPresenter } from '../../../adresse';
import { MarkersPresenter } from '../../presenters';

const MIN_SEARCH_TERM_LENGTH: number = 3;
const SEARCH_DEBOUNCE_TIME: number = 300;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-location',
  templateUrl: './user-location.component.html'
})
export class UserLocationComponent {
  private readonly _searchTerm$: Subject<string> = new Subject<string>();

  private readonly _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  public addressNotFound$: Observable<boolean> = of(false);

  public addressesFound$: Observable<AddressFoundPresentation[]> = this._searchTerm$.pipe(
    map((searchTerm: string): string => searchTerm.trim()),
    filter((searchTerm: string): boolean => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
    debounceTime(SEARCH_DEBOUNCE_TIME),
    distinctUntilChanged(),
    switchMap((searchTerm: string): Observable<AddressFoundPresentation[]> => this._addressPresenter.search$(searchTerm))
  );

  public constructor(
    private readonly _addressPresenter: AddressPresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public onSearchAddress(searchTerm: string): void {
    this._searchTerm$.next(searchTerm);
  }

  public onSelectAddress(address: AddressFoundPresentation): void {
    this.markersPresenter.center(address.localisation);
  }

  public onGeoLocate(): void {
    this._loadingState$.next(true);
    window.navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
      this.markersPresenter.center(
        Localisation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      );
      this._loadingState$.next(false);
    });
  }
}
