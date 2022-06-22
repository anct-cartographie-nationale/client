import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartographieProviders } from '@features/cartographie/infrastructure';
import { MainLayout, RootLayout } from '../layouts';
import { RootRoutingModule } from './root-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainLayout, RootLayout],
  imports: [BrowserAnimationsModule, RootRoutingModule, HttpClientModule],
  entryComponents: [RootLayout],
  providers: [...CartographieProviders]
})
export class RootModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(RootLayout, { injector });
    customElements.define('fr-mediation-numerique', webComponent);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngDoBootstrap() {}
}
