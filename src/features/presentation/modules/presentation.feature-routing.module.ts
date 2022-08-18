import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationLayout } from '../layouts';

const ROUTES: Routes = [
  {
    component: PresentationLayout,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class PresentationFeatureRoutingModule {}
