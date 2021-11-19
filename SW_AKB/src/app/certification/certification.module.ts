import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CertificationPage } from './certification.page';
import { CalendarModule } from "ion2-calendar";
import { CertificationPageRoutingModule } from './certification-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificationPageRoutingModule,
    CalendarModule
  ],
  declarations: [CertificationPage]
})
export class CertificationPageModule {}
