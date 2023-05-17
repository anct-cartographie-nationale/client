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
  name: 'Nationale',
  logo: '',
  illustration: 'svg-france-et-outremer.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'du Hub du Sud',
  sousTitre: "des lieux d'inclusion numérique",
  logo: './assets/img/logo/hubs/100/Hub du Sud.png',
  logo: './assets/img/logo/hubs/100/Hub du Sud.png',
  illustration: 'svg-paca.svg'
};
