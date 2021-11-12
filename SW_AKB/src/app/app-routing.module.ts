import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'userlogin',
    loadChildren: () => import('./userlogin/userlogin.module').then( m => m.UserloginPageModule)
  },
  {
    path: 'managelogin',
    loadChildren: () => import('./managelogin/managelogin.module').then( m => m.ManageloginPageModule)
  },
  {
    path: 'usermain',
    loadChildren: () => import('./usermain/usermain.module').then( m => m.UsermainPageModule)
  },
  {
    path: 'managemain',
    loadChildren: () => import('./managemain/managemain.module').then( m => m.ManagemainPageModule)
  },
  {
    path: 'createElection',
    loadChildren: () => import('./createElection/createElection.module').then( m => m.CreateElectionPageModule)
  },
  {
    path: 'manageElection',
    loadChildren: () => import('./manageElection/manageElection.module').then( m => m.ManageElectionPageModule)
  },
  {
    path: 'userElection',
    loadChildren: () => import('./userElection/userElection.module').then( m => m.UserElectionPageModule)
  },
  

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }