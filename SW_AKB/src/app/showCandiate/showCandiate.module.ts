import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ShowCandiatePage } from './showCandiate.page';

import { ShowCandiatePageRoutingModule } from './showCandiate-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowCandiatePageRoutingModule
  ],
  declarations: [ShowCandiatePage]
})
export class ShowCandiatePageModule {}
