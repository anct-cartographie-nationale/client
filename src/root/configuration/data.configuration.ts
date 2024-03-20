import { InjectionToken } from '@angular/core';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export type DataCoordinateursConfiguration = {
  conseillers: string;
  coordinateurs: string;
};

export const DATA_COORDINATEURS_CONFIGURATION: DataCoordinateursConfiguration = {
  conseillers: 'https://api.conseiller-numerique.gouv.fr/coordination-conseillers',
  coordinateurs: 'https://api.conseiller-numerique.gouv.fr/coordinateurs'
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: './assets/data/20240320-nouvelle-caledonie-lieux-de-mediation-numeriques-nouvelle-caledonie.json'
};
