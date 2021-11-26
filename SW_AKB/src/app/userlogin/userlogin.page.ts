import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


let _this;

@Component({
  selector: 'app-home',
  templateUrl: 'userlogin.page.html',
  styleUrls: ['userlogin.page.scss'],
})
export class UserloginPage {
  public name: string="박민수";
  public phonenumber: string="01026175365";
  public realnumber: string="+8201012341234";
  public uid: string="";
  public item: any;
  auth = getAuth();
  recaptchaVerifier:RecaptchaVerifier;
 
  
  

 constructor(
   private alertCtrl:AlertController,
   public ac:ActivatedRoute,
   public router: Router,
   public navCtrl: NavController,
   public http: HttpClient
   
 
 ) {_this=this;}
 

 ngOnInit() {
  this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {'size': 'normal'}, this.auth);
  _this.verify_user()
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
    this.item = result;
    //this.uid = this.item[0].UID;
    //console.log(this.uid);
    console.log(this.item);
  }, (error) => {

    
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


}
