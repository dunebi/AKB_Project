import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";

let _this;

@Component({
  selector: 'app-home',
  templateUrl: 'userlogin.page.html',
  styleUrls: ['userlogin.page.scss'],
})
export class UserloginPage {
  public name: string="";
  public phonenumber: string="";
  public realnumber: string="";
 
  public uid: any;
  auth = getAuth();
  recaptchaVerifier:RecaptchaVerifier;
 
  
  

 constructor(
  private location:Location,
   private alertCtrl:AlertController,
   public ac:ActivatedRoute,
   public router: Router,
   public navCtrl: NavController,
   public http: HttpClient
   
 
 ) {_this=this;}
 

 ngOnInit() {
  this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {'size': 'normal'}, this.auth);
  
 }

 

 async verify_user(){
  
  let formData = new FormData();
 
  formData.append('name',this.name);
  formData.append('realnumber',this.phonenumber);
  try {
    const response = await fetch('http://34.64.125.190:3000/userlogin', {
      method: 'POST',
      body: formData,
    });



   
    
    

    if (!response.ok) {
      throw new Error(response.statusText);
      
    }
    console.log(response);

    let data:Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/userloginget');
    console.log(data)
    data.subscribe(result =>{
    this.uid = result;
    console.log(this.uid)
    if (this.uid == 0)
    {

      console.log('Error');
      return _this.alertCtrl.create({
        header: '',
        message: '투표 가능한 선거가 존재하지 않습니다.',
        buttons: [{
          text: '확인',
          role: 'cancel',
          handler: () => {
            
            window.location.reload();
          
          
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    else{
      console.log(this.uid);
      console.log(typeof(this.uid))
      this.router.navigate(['usermain',this.uid]);

    }
  }, (error) => {

    console.log(error)
  })
    
  } catch (err) {
    console.log(err);
  }

  
  

 }
 

 



async createSMSphone(){
  this.realnumber='+82'+this.phonenumber;
}



 async sendPhone(){
    
  
  
  var applicationVerifier = this.recaptchaVerifier;
  this.createSMSphone();
  const res = signInWithPhoneNumber(this.auth,this.realnumber, applicationVerifier)
  .then( async (confirmationResult) => {
    console.log('confirm ' + confirmationResult);
    let prompt = await this.alertCtrl.create({
    inputs: [{ name: 'Code', placeholder: '인증 번호를 입력하세요' }],
    buttons: [
      { text: '취소'
      },
      { text: '확인',
        handler: data => {
          confirmationResult.confirm(data.Code)
          .then(function (result) {
            
  
           
            return _this.alertCtrl.create({
              header: '',
              message: '인증에 성공했습니다',
              buttons: [{
                text: '확인',
                role: 'cancel',
                handler: () => {
                  
                  _this.verify_user()
                
                
                }
              }]
            }).then(alertEl => {
              alertEl.present();
            });
          
        
          })
          .catch(function (error) {
           
            
            return _this.alertCtrl.create({
              header: '',
              message: '인증번호가 틀렸습니다! 다시 인증을 받으세요',
              buttons: [{
                text: '확인',
                role: 'cancel'
              }]
            }).then(alertEl => {
              alertEl.present();
              //window.location.reload();
            });
  


          });
        }
      }
    ]
  });
  await prompt.present();
  
})
.catch(function (error) {
  console.error("SMS not sent by ", error);
  
})

}

myBackButton(){
  this
  .router
  .navigate(['home']);
}
}
