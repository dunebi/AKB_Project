import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysmanageVoterPageRoutingModule } from './sysmanage-voter-routing.module';

import { SysmanageVoterPage } from './sysmanage-voter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysmanageVoterPageRoutingModule
  ],
  declarations: [SysmanageVoterPage]
})
export class SysmanageVoterPageModule {}
