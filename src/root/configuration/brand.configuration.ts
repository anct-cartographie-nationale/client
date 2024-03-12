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
  name: 'Aix-en-Provence',
  logo: '',
  illustration: 'svg-paca.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'Aix-en-Provence',
  sousTitre: "des lieux d'inclusion numérique",
  logo: './assets/img/logo/aix-en-provence.jpg',
  logoAvecTexte: '',
  illustration: 'svg-paca.svg'
};
