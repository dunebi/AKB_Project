import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ManageElectionPage } from './manageElection.page';

import { ManageElectionPageRoutingModule } from './manageElection-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageElectionPageRoutingModule
  ],
  declarations: [ManageElectionPage]
})
export class ManageElectionPageModule {}
