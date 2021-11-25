import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListInfoPageRoutingModule } from './listInfo-routing.module';

import { ListInfoPage } from './listInfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListInfoPageRoutingModule  ],
  declarations: [ListInfoPage]
})
export class ListInfoPageModule {}
