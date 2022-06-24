import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'demarrer.page.html'
})
export class DemarrerPage {
  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}
}
