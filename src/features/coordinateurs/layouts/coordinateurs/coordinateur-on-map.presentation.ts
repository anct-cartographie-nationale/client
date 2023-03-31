export type CoordinateurOnMapPresentation = {
  id: string;
  nom: string;
  perimetre: 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  dispositif: string;
  latitude: number;
  longitude: number;
};
