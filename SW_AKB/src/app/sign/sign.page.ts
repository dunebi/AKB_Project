import { Component } from '@angular/core';
import {AlertController, IonBackButtonDelegate} from '@ionic/angular';
import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Location } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'sign.page.html',
  styleUrls: ['sign.page.scss'],
})
export class SignPage {
  private id:string;
  private pw:string='';
  private phonenumber:string;
  private items:any;
  private pw_check:string='';
  private id_check:Boolean= false;
  private isRead : Boolean = false;
  private temp: string;
  constructor(private location:Location,private AlertCtrl:AlertController, private http:HttpClient, private navCtrl : NavController, private router:Router) {}

  async check(){
    let formData = new FormData();
    if(this.id==undefined){
      this.AlertCtrl.create({
        header:'',
        message:'아이디를 입력하지 않았습니다.',
        buttons: [
          {
            text: '확인',
            role : 'cancel'
          }
        ]
      })
      .then(alertEl =>{
        alertEl.present();
      });
    }
    else{
      formData.append('id', this.id);
      try{
        const response = await fetch('http://34.64.125.190:3000/usercheck', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        await this.checkresult();

      } catch (err) {
        console.log('error!')
        console.log(err);
      }
    }
  }

  async checkresult(){
    let data: Observable<any>;
    data = await this
            .http
            .get('http://34.64.125.190:3000/checkresult');
    data.subscribe(result => {
      this.items = result;
      if(this.items == 0){
        this.AlertCtrl.create({
          header:'',
          message:'사용가능한 아이디 입니다.',
          buttons: [
            {
              text : '확인',
              handler : data => {
                //this.isRead = true
                //this.isReadOnly();
              }
            }
          ]
        }).then(alertEl => {
          alertEl.present();

        })
        this.id_check = true
        this.temp = this.id
      } else {
        this.AlertCtrl.create({
          header:'',
          message: '이미 존재하는 아이디 입니다.',
          buttons: [{
            text : '확인',
            handler : data => {
              this.id = undefined
            }
          }]
          
        }).then(alertEl=>{
          //alertEl.dismiss(this.id, undefined);
          alertEl.present();
        })
      }
    }, (error) => {
      //this.loadData();
    })
  }

  async sign(){
    let formData2 = new FormData();
    if(this.id==undefined||this.pw==undefined||this.phonenumber==undefined||this.pw_check==undefined){
      this.AlertCtrl.create({
        header: '',
        message: '양식을 모두 작성하신 뒤 다시 시도하여 주십시오.'
      }).then(alertEl => {
        alertEl.present();
      })
    } else if(this.pw != this.pw_check){
      this.AlertCtrl.create({
        header: '',
        message: '비밀번호를 다시 확인해 주십시오.',
        buttons: [{
          text : '확인'
        }]
      }).then(alertEl => {
        alertEl.present();
      })
    } else if(this.id_check == false || this.id != this.temp){
      this.AlertCtrl.create({
        header:'',
        message: '아이디 중복체크를 진행하여 주십시오.',
        buttons:[{
          text: '확인',
        }]
      }).then(alertEl => {
        alertEl.present();
      })
    } else {
      formData2.append('id', this.id)
      formData2.append('password', this.pw)
      formData2.append('phonenum', this.phonenumber)
      try{
        const response = await fetch('http://34.64.125.190:3000/signup', {
          method : 'POST',
          body : formData2
        });
        if (!response.ok){
          throw new Error(response.statusText);
        }
        console.log(response);

        await this.signresult();
      }catch(err){
        console.log(err)
      }
    }
    this.id_check = false;
  }

  async signresult(){
    let data: Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/signupresult');
    data.subscribe(result => {
      this.items = result;
      console.log(this.items)
      console.log(typeof(this.items))
      if(this.items === 0){
        this.AlertCtrl.create({
          header:'',
          message:'회원가입이 완료되었습니다. 다시 로그인하여 주십시오.',
          buttons: [
            {
            text: '확인',
            role: 'confirm',
            handler:  () => {
              console.log("come in")
              this.navCtrl.navigateRoot('/managelogin');
            }
          }]
        }).then(alertEl => {
          alertEl.present();
        })
      }
    }, (error) => {
      //this.loadData();
    })
    
    
  }

  isReadOnly(){
    return this.isRead
  }
  myBackButton(){
    this.location.back();
  }
}
