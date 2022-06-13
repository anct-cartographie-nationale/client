import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from '../layouts';
import { CartographieFeatureModule } from '@features/cartographie/infrastructure';

const ROUTES: Routes = [
  {
    children: [
      {
        loadChildren: async (): Promise<CartographieFeatureModule> =>
          (await import('@features/cartographie/infrastructure')).CartographieFeatureModule,
        path: ''
      }
    ],
    component: MainLayout,
    path: 'cartographie'
  },
  { path: '**', pathMatch: 'full', redirectTo: 'cartographie' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
