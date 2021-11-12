import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UsermainPage } from './usermain.page';

import { UsermainPageRoutingModule } from './usermain-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermainPageRoutingModule
  ],
  declarations: [UsermainPage]
})
export class UsermainPageModule {}
