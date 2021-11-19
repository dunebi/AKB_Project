import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ManageVoterPage } from './manageVoter.page';

import { ManageVoterPageRoutingModule } from './manageVoter-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageVoterPageRoutingModule
  ],
  declarations: [ManageVoterPage]
})
export class ManageVoterPageModule {}
