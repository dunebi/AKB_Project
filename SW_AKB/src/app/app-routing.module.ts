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
    path: 'manageCandiate',
    loadChildren: () => import('./manageCandiate/manageCandiate.module').then( m => m.ManageCandiatePageModule)
  },
  {
    path: 'manageVoter',
    loadChildren: () => import('./manageVoter/manageVoter.module').then( m => m.ManageVoterPageModule)
  },
  {
    path: 'certification/:name/:phonenumber',
    loadChildren: () => import('./certification/certification.module').then( m => m.CertificationPageModule)
  },
  {
    path: 'sign',
    loadChildren: () => import('./sign/sign.module').then( m => m.SignPageModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then( m => m.VotePageModule)
  },
  {
    path: 'showCandiate',
    loadChildren: () => import('./showCandiate/showCandiate.module').then( m => m.ShowCandiatePageModule)
  },
  {
    path: 'sysmanagemain',
    loadChildren: () => import('./sysmanagemain/sysmanagemain.module').then( m => m.SysManagemainPageModule)
  },
  
  {
    path: 'sysmanageElection',
    loadChildren: () => import('./sysmanageElection/sysmanageElection.module').then( m => m.SysManageElectionPageModule)
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