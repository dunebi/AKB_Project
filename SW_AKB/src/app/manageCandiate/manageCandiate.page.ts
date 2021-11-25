import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'manageCandiate.page.html',
  styleUrls: ['manageCandiate.page.scss'],
})
export class ManageCandiatePage {

  constructor(public atrCtrl: AlertController) {}
  async delete() {
    const al = await this.atrCtrl.create({
      header:'확인!',
      message: '후보자를 정말로 삭제하시겠습니까?',
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          cssClass:'secondary',
          handler:(blah)=>{
            console.log("삭제 취소");
          }
        },
        {
          text:'Okay',
          handler:()=>{
            //console.log('게시물 삭제');
          //  this.db.object(`board/${this.postkey}`).set(null);
          //  this.alertDeletepost();
          }
        }
      ]
    });
    await al.present();
  }
}
