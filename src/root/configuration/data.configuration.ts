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
    'https://static.data.gouv.fr/resources/lieux-de-mediation-numerique-sur-le-territoire-le-havre-fournis-par-le-havre/20240620-150530/20240620-le-havre-lieux-de-mediation-numeriques-le-havre.json'
};
