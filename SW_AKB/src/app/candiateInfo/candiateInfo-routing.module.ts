import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandiateInfoPage } from './candiateInfo.page';

const routes: Routes = [
  {
    path: '',
    component: CandiateInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandiateInfoPageRoutingModule {}
