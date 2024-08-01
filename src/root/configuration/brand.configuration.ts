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
  name: 'Les Assembleurs',
  sousTitre: "des lieux d'inclusion numérique",
  logo: 'https://assembleurs.co/static/Icone_logo_Assembleurs-c72c4e056eb34a846a713939501dad85.png',
  logoAvecTexte: 'https://assembleurs.co/static/Icone_logo_Assembleurs-c72c4e056eb34a846a713939501dad85.png',
  illustration: 'svg-france-et-outremer.svg'
};
