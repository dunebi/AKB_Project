import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageloginPage } from './managelogin.page';

const routes: Routes = [
  {
    path: '',
    component: ManageloginPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageloginPageRoutingModule {}
