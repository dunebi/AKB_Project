import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SysManageElectionPage } from './sysmanageElection.page';

import { SysManageElectionPageRoutingModule } from './sysmanageElection-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysManageElectionPageRoutingModule
  ],
  declarations: [SysManageElectionPage]
})
export class SysManageElectionPageModule {}
