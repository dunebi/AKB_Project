import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysManageElectionPage } from './sysmanageElection.page';

const routes: Routes = [
  {
    path: '',
    component: SysManageElectionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysManageElectionPageRoutingModule {}
