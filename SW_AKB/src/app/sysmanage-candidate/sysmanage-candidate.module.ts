import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysmanageCandidatePageRoutingModule } from './sysmanage-candidate-routing.module';

import { SysmanageCandidatePage } from './sysmanage-candidate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysmanageCandidatePageRoutingModule
  ],
  declarations: [SysmanageCandidatePage]
})
export class SysmanageCandidatePageModule {}
