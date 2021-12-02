import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyElectionPage } from './modify-election.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyElectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyElectionPageRoutingModule {}
