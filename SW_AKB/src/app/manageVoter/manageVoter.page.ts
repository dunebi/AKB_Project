import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
@Component({
  selector: 'app-home',
  templateUrl: 'manageVoter.page.html',
  styleUrls: ['manageVoter.page.scss'],
})
export class ManageVoterPage {

 public editflag=false;

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
async delete() {
    const al = await this.atrCtrl.create({
      header:'확인!',
      message: '유권자를 정말로 삭제하시겠습니까?',
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

edit() {
  if(this.editflag==true)
  {
    this.editflag=false;
  }
  else{
    this.editflag=true;
  }
}
}
