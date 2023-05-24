import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ConditionAcces, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationLayout } from '../../layouts';
import {
  OrientationInformationContent,
  OrientationItemPresentation,
  AccessibiliteOrientationInformationTypes
} from '../../presenters';
import conditionAccesData from './condition-acces.json';
import publicSpecifiqueAcceuilli from './public-specifique-accueilli.json';
import { ACCESSIBILITE_INFORMATION_MODAL_TEXTS } from './accessibilite-information-modal-texts';
import { preventInconsistentSelection } from './accessibilite.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accessibilite.page.html'
})
export class AccessibilitePage {
  public selectedOrientationInformation: OrientationInformationContent | null = null;

  public selectedOrientationInformationType: Service | null = null;

  public conditionAccesOptions: OrientationItemPresentation<string>[] = conditionAccesData;

  public publicSpecifiqueAcceuilliOptions: OrientationItemPresentation<string>[] = publicSpecifiqueAcceuilli;

  public readonly orientationInformations: Record<AccessibiliteOrientationInformationTypes, OrientationInformationContent> =
    ACCESSIBILITE_INFORMATION_MODAL_TEXTS;

  private readonly conditionAccessField: AbstractControl<ConditionAcces[]> | null =
    this.orientationLayout.filterForm.get('conditions_acces');

  public constructor(public readonly orientationLayout: OrientationLayout) {}

  public selectParticipation(participationIndex: number): void {
    if (this.conditionAccessField?.value == null) return;

    this.conditionAccessField.setValue(
      preventInconsistentSelection(
        conditionAccesData[participationIndex].value as ConditionAcces,
        this.conditionAccessField.value
      )
    );
  }
}
