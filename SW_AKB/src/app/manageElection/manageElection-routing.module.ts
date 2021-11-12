import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageElectionPage } from './manageElection.page';

const routes: Routes = [
  {
    path: '',
    component: ManageElectionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageElectionPageRoutingModule {}
