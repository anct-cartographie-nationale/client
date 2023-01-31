import { InjectionToken } from '@angular/core';

export type BrandConfiguration = {
  name: string;
  logo: string;
  illustration: string;
};

export const BRAND_TOKEN: InjectionToken<BrandConfiguration> = new InjectionToken<BrandConfiguration>('brand.configuration');

export const BRAND_CONFIGURATION: BrandConfiguration = {
  name: 'Nationale',
  logo: '',
  illustration: 'svg-france-et-outremer.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'Nationale',
  logo: './assets/img/logo/cartographie-nationale.png',
  illustration: 'svg-france-et-outremer.svg'
};
