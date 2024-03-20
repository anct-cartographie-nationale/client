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
  name: 'Nouvelle-Calédonie',
  logo: '',
  illustration: 'svg-france-et-outremer.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'Nouvelle-Calédonie',
  sousTitre: "des lieux d'inclusion numérique",
  logo: './assets/img/logo/cartographie-nationale-brand.png',
  logoAvecTexte: './assets/img/logo/cartographie-nationale-brand-text.png',
  illustration: 'svg-france-et-outremer.svg'
};
