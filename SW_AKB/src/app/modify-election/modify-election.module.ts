import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from "ion2-calendar";
import { ModifyElectionPageRoutingModule } from './modify-election-routing.module';

import { ModifyElectionPage } from './modify-election.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyElectionPageRoutingModule,
    CalendarModule
  ],
  declarations: [ModifyElectionPage]
})
export class ModifyElectionPageModule {}
