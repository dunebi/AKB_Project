import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagemainPage } from './managemain.page';

const routes: Routes = [
  {
    path: '',
    component: ManagemainPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagemainPageRoutingModule {}
