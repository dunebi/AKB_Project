import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'vote/:eid/:uid',
    loadChildren: () => import('./vote/vote.module').then( m => m.VotePageModule)
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
    path: 'usermain/:uid',
    loadChildren: () => import('./usermain/usermain.module').then( m => m.UsermainPageModule)
  },
  {
    path: 'managemain/:mid',
    loadChildren: () => import('./managemain/managemain.module').then( m => m.ManagemainPageModule)
  },
  {
    path: 'createElection/:mid',
    loadChildren: () => import('./createElection/createElection.module').then( m => m.CreateElectionPageModule)
  },
  {
    path: 'manageElection/:eid/:mid',
    loadChildren: () => import('./manageElection/manageElection.module').then( m => m.ManageElectionPageModule)
  },
  {
    path: 'userElection/:eid/:uid/:ustate',
    loadChildren: () => import('./userElection/userElection.module').then( m => m.UserElectionPageModule)
  },
  {
    path: 'manageCandiate/:eid',
    loadChildren: () => import('./manageCandiate/manageCandiate.module').then( m => m.ManageCandiatePageModule)
  },
  {
    path: 'manageVoter/:eid',
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
    path: 'showCandiate/:eid',
    loadChildren: () => import('./showCandiate/showCandiate.module').then( m => m.ShowCandiatePageModule)
  },
  {
    path: 'sysmanagemain',
    loadChildren: () => import('./sysmanagemain/sysmanagemain.module').then( m => m.SysManagemainPageModule)
  },
  
  {
    path: 'sysmanageElection/:eid',
    loadChildren: () => import('./sysmanageElection/sysmanageElection.module').then( m => m.SysManageElectionPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'showresult',
    loadChildren: () => import('./showresult/showresult.module').then( m => m.ShowresultPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sysmanage-voter/:eid',
    loadChildren: () => import('./sysmanage-voter/sysmanage-voter.module').then( m => m.SysmanageVoterPageModule)
  },
  {
    path: 'sysmanage-candidate/:eid',
    loadChildren: () => import('./sysmanage-candidate/sysmanage-candidate.module').then( m => m.SysmanageCandidatePageModule)
  },
  {
    path: 'modify-election/:eid/:mid',
    loadChildren: () => import('./modify-election/modify-election.module').then( m => m.ModifyElectionPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }