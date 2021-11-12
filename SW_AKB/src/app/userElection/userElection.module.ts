import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserElectionPage } from './userElection.page';

import { UserElectionPageRoutingModule } from './userElection-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserElectionPageRoutingModule
  ],
  declarations: [UserElectionPage]
})
export class UserElectionPageModule {}
