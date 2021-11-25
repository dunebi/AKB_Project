import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListInfoPage } from './listInfo.page';

const routes: Routes = [
  {
    path: '',
    component: ListInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListInfoPageRoutingModule {}
