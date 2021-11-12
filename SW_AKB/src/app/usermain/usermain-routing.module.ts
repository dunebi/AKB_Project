import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermainPage } from './usermain.page';

const routes: Routes = [
  {
    path: '',
    component: UsermainPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermainPageRoutingModule {}
