import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ManageCandiatePage } from './manageCandiate.page';

import { ManageCandiatePageRoutingModule } from './manageCandiate-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCandiatePageRoutingModule
  ],
  declarations: [ManageCandiatePage]
})
export class ManageCandiatePageModule {}
