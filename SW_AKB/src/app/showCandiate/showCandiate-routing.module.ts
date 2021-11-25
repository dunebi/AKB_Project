import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCandiatePage } from './showCandiate.page';

const routes: Routes = [
  {
    path: '',
    component: ShowCandiatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowCandiatePageRoutingModule {}
