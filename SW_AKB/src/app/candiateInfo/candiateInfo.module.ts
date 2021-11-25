import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandiateInfoPageRoutingModule } from './candiateInfo-routing.module';

import { CandiateInfoPage } from './candiateInfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandiateInfoPageRoutingModule  ],
  declarations: [CandiateInfoPage]
})
export class CandiateInfoPageModule {}
