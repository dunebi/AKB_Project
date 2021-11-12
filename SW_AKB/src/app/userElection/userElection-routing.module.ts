import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserElectionPage } from './userElection.page';

const routes: Routes = [
  {
    path: '',
    component: UserElectionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserElectionPageRoutingModule {}
