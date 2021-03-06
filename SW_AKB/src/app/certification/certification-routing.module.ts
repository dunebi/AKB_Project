import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificationPage } from './certification.page';

const routes: Routes = [
  {
    path: '',
    component: CertificationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificationPageRoutingModule {}
