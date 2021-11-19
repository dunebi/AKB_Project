import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCandiatePage } from './manageCandiate.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCandiatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCandiatePageRoutingModule {}
