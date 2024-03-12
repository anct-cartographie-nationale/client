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
  name: 'Aude',
  logo: '',
  illustration: 'svg-occitanie.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: "de l'Aude",
  sousTitre: "des lieux d'inclusion numérique",
  logo: './assets/img/logo/cartographie-nationale-brand.png',
  logoAvecTexte: './assets/img/logo/cartographie-nationale-brand-text.png',
  illustration: 'svg-occitanie.svg'
};
