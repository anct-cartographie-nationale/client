import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import { OrientationLayout } from '../../layouts';
import { HttpParams } from '@angular/common/http';

const currentDate = () => new Date().toISOString().substring(0, 10);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disponibilite.page.html'
})
export class DisponibilitePage {
  public ouvertActuellementFormControl: FormControl = new FormControl(
    this.orientationLayout.filterForm.get('ouvert_actuellement')?.value
  );

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {}

  private clearDateOuverture(): void {
    this.orientationLayout.filterForm.get('date_ouverture')?.reset();
    this.ouvertActuellementFormControl.reset();
  }

  private clearOuvertActuellement(): void {
    this.orientationLayout.filterForm.get('ouvert_actuellement')?.reset();
    this.ouvertActuellementFormControl.reset();
  }

  private setDateOuverture(dateOuverture: string = currentDate()): void {
    this.orientationLayout.filterForm.get('date_ouverture')?.setValue(dateOuverture);
  }

  private setOuvertActuellement(): void {
    this.setDateOuverture();
    this.orientationLayout.filterForm.get('ouvert_actuellement')?.setValue('true');
  }

  public setDateOuvertureToNow(event: Event & { target: HTMLInputElement }) {
    event.target.checked ? this.setOuvertActuellement() : this.clearOuvertActuellement();
  }

  public selectDate(event: Event & { target: HTMLInputElement }) {
    this.clearOuvertActuellement();
    event.target.value === '' ? this.clearDateOuverture() : this.setDateOuverture(event.target.value);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}
