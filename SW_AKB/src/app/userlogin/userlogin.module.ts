import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserloginPage } from './userlogin.page';

import { UserloginPageRoutingModule } from './userlogin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserloginPageRoutingModule
  ],
  declarations: [UserloginPage]
})
export class UserloginPageModule {}
