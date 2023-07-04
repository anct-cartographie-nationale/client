import { InjectionToken } from '@angular/core';

export type BrandConfiguration = {
  name: string;
  sousTitre?: string;
  logo: string;
  logoAvecTexte?: string;
  illustration: string;
};

export const BRAND_TOKEN: InjectionToken<BrandConfiguration> = new InjectionToken<BrandConfiguration>('brand.configuration');

export const BRAND_CONFIGURATION: BrandConfiguration = {
  name: 'vendéenne',
  logo: '',
  illustration: 'svg-france-et-outremer.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'vendéenne',
  sousTitre: '',
  logo: './assets/img/logo/vendee-numerique-brand.svg',
  logoAvecTexte: './assets/img/logo/vendee-numerique-brand.svg',
  illustration: 'svg-pays-de-la-loire.svg'
};
