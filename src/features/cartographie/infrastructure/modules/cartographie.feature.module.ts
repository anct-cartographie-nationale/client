import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  GeometryPolygonConfiguration,
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  MapModule,
  StructureModule,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { UiLieuxMediationNumeriqueModule } from '@gouvfr-anct/mediation-numerique/ui';
import { CartographieLayout } from '../presentation/layouts';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../presentation/pages';
import { GeojsonService, SearchService, StructureService } from '../services';
import metropole from '../services/assets/metropole.json';
import { CartographieFeatureRoutingModule } from './cartographie.feature-routing.module';
import { LieuCardComponent } from '../presentation/components/lieu-card/lieu-card.component';
import { MARKER_TYPE_CONFIGURATION, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../../../root';

@NgModule({
  declarations: [CartographieLayout, LieuxMediationNumeriqueListPage, LieuxMediationNumeriqueDetailsPage, LieuCardComponent],
  imports: [
    HttpClientModule,
    MapModule.forRoot(
      metropole as GeometryPolygonConfiguration,
      {} as ZoomLevelConfiguration,
      {} as InitialPositionConfiguration,
      MARKER_TYPE_CONFIGURATION,
      GeojsonService
    ),
    StructureModule.forRoot(SearchService, StructureService),
    CartographieFeatureRoutingModule,
    CommonModule,
    UiLieuxMediationNumeriqueModule
  ],
  providers: [
    GeojsonService,
    { provide: INITIAL_POSITION_TOKEN, useValue: POSITION_CONFIGURATION },
    { provide: ZOOM_LEVEL_TOKEN, useValue: ZOOM_LEVEL_CONFIGURATION }
  ]
})
export class CartographieFeatureModule {}
