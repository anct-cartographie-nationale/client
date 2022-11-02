import { InjectionToken } from '@angular/core';

export type BrandConfiguration = {
  name: string;
  logo: string;
};

export const BRAND_TOKEN: InjectionToken<BrandConfiguration> = new InjectionToken<BrandConfiguration>('brand.configuration');

export const BRAND_CONFIGURATION: BrandConfiguration = {
  name: 'du HUB Antilles - Guyane',
  logo: '../../assets/img/brand/hub-antilles.svg'
};
