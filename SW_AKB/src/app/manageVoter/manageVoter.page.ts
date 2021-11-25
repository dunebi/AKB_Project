import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'manageVoter.page.html',
  styleUrls: ['manageVoter.page.scss'],
})
export class ManageVoterPage {


  public items:any;
  private eid : string;
  constructor(public atrCtrl: AlertController,public navCtrl: NavController,public http: HttpClient) {
    
    this.make_json();
    this.loadData();
    

  }

  async make_json(){

    let formData = new FormData();
    this.eid='1';
    formData.append('eid',this.eid);
    try {
      //localhost 용
      const response = await fetch('http://34.64.125.190:3000/manageVoter', {
        method: 'POST',
        body: formData,
      });
  
  
  
      if (!response.ok) {
        throw new Error(response.statusText);
        
      }
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }

    


   }
  async loadData(){
    let data:Observable<any>;
    data = this.http.get('http://34.64.125.190:3000/voterjson');

    data.subscribe(result =>{
      this.items = result;
    }, (error) => {

      window.location.reload();
    })
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
