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
  lieuxDeMediationNumerique:
    'https://cartographie.societenumerique.gouv.fr/api/v0/lieux-inclusion-numerique?source[eq]=Les%20Assembleurs'
};
