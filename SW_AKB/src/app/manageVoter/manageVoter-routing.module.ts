import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVoterPage } from './manageVoter.page';

const routes: Routes = [
  {
    path: '',
    component: ManageVoterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVoterPageRoutingModule {}
