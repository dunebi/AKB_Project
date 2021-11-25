import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SysManagemainPage } from './sysmanagemain.page';

import { SysManagemainPageRoutingModule } from './sysmanagemain-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysManagemainPageRoutingModule
  ],
  declarations: [SysManagemainPage]
})
export class SysManagemainPageModule {}
