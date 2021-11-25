import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysManagemainPage } from './sysmanagemain.page';

const routes: Routes = [
  {
    path: '',
    component: SysManagemainPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysManagemainPageRoutingModule {}
