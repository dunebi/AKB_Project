import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ManageloginPage } from './managelogin.page';

import { ManageloginPageRoutingModule } from './managelogin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageloginPageRoutingModule
  ],
  declarations: [ManageloginPage]
})
export class ManageloginPageModule {}
