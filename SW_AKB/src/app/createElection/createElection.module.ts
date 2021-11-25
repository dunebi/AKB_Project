import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CreateElectionPage } from './createElection.page';
import { CalendarModule } from "ion2-calendar";

import { CreateElectionPageRoutingModule } from './createElection-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateElectionPageRoutingModule,
    CalendarModule
  ],
  declarations: [CreateElectionPage]
})
export class CreateElectionPageModule {}
