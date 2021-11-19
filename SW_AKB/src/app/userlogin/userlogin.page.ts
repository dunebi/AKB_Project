import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";


let _this;
@Component({
  selector: 'app-home',
  templateUrl: 'userlogin.page.html',
  styleUrls: ['userlogin.page.scss'],
})
export class UserloginPage {
  public name: string="";
  public phonenumber: string=""; 
  auth = getAuth();
  recaptchaVerifier:RecaptchaVerifier;
 
  
  

 constructor(
   private alertCtrl:AlertController,
   public ac:ActivatedRoute,
   public router: Router,
   public navCtrl: NavController,
   
 
 ) {_this=this;}
 

 ngOnInit() {
  this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
 }


 

 
 CertificationNumber(n,p){

   if(this.name==""||this.phonenumber==""){
     this.alertCtrl.create({
       header:'',
       message: '내용을 모두 입력해주세요',
       buttons:[{
         text:'확인',
         role: 'cancel'
       }]
     }).then(alertEI=>{
       alertEI.present();
     });
    
   }
   else{
   n=this.name
   p=this.phonenumber
   this.router.navigate(['certification',n,p]);
   }
 }

async createSMSphone(){
  this.phonenumber='+82'+this.phonenumber;
}

 async sendPhone(){
    
  
  
  var applicationVerifier = this.recaptchaVerifier;
  this.createSMSphone();
  const res = signInWithPhoneNumber(this.auth,this.phonenumber, applicationVerifier)
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
                role: 'cancel'
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
              window.location.reload();
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


}
