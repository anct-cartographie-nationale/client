import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { StructureDetailsComponent } from './structure-list/components/structure-details/structure-details.component';
import { StructureListComponent } from './structure-list/structure-list.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

const routes: Routes = [
  { path: 'print', outlet: 'print', children: [{ path: 'structure', component: StructureDetailsComponent }] },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: HomeComponent,
  },
  {
    path: 'sturctures',
    component: StructureListComponent,
  },
  {
    path: 'resources',
    component: HomeComponent,
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'users/verify/:id',
    component: UserVerificationComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
