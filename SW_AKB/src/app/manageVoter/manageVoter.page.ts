import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
@Component({
  selector: 'app-home',
  templateUrl: 'manageVoter.page.html',
  styleUrls: ['manageVoter.page.scss'],
})
export class ManageVoterPage {



  constructor(public atrCtrl: AlertController) {

  }
  
  async plus() {
  let alert = this.atrCtrl.create({
    header: '명부추가',
    inputs: [
      {
        name: '이름',
        placeholder: '유권자 이름'
        
      },
      {
        name: '전화번호',
        placeholder: '유권자 전화번호',
        
      }
    ],
    buttons: [
      {
        text: '취소',
        role: 'cancel',
        handler: data => {
          console.log('You Clicked on Cancel');
        }
      },
      {
        text: '명부추가',
        role: '',
        handler: data => {
          console.log('명부를 추가합니다');
        }
        
      }
    ]
  });
  (await alert).present();
}
}
