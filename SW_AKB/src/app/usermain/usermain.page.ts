import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'usermain.page.html',
  styleUrls: ['usermain.page.scss'],
})
export class UsermainPage {
  private uid: string; //이후 파라미터  불러오면서 수정
  private items: any;
  public state: Array<any>;
  eid: any;
  ustate: any;
  constructor(
    public atrCtrl : AlertController,
    public router : Router,
    private http:HttpClient, private ac:ActivatedRoute) {
    this.makejson();
  }

  async makejson(){
    this.uid = this.ac.snapshot.paramMap.get('uid');
    let formData = new FormData();
    formData.append('uid', this.uid);
    try{
      const response = await fetch('http://34.64.125.190:3000/usermain', {
        method: 'POST',
        body: formData
      });
      if(!response.ok){
        throw new Error(response.statusText)
      }
      console.log(response)
      await this.loadData();

    } catch(err){
      console.log(err)
    }
    

  }
  async loadData(){
    let data : Observable<any>;
    data = this.http.get('http://34.64.125.190:3000/uelectionjson');
    data.subscribe(result => {
      this.items = result
      this.state = new Array(this.items.length)
 
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
                    .ue_state;
                console.log(this.state[i]);
                
            }
    })
  }
  async getElection(item : any) {
    if(item.ue_state=="선거종료")
    {
      this
      .router
      .navigate(['showresult', item.EID]);
    }
    else{
    this.eid = item.EID;
    this.ustate = item.ue_state;
    this
        .router
        .navigate(['userElection', this.eid,this.uid,this.ustate]);
    }
}
gohome(){
  this
  .atrCtrl
  .create({
      header: '',
      message: '정말로 로그아웃을 하시겠습니까?',
      buttons: [
          {
              text: '취소',
              role: 'cancel'
          }, {
              text: '확인',
              role: 'confirm',
              handler: () => {
                  this
                  .router
                  .navigate(['home']);
              }
          }
      ]
  })
  .then(alertEl => {
      alertEl.present();
  })


  
}
}
