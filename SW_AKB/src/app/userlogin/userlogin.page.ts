import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'userlogin.page.html',
  styleUrls: ['userlogin.page.scss'],
})
export class UserloginPage {
  public name: string="";
  public phonenumber: string=""; 


 constructor(
   private alertCtrl:AlertController,
   public ac:ActivatedRoute,
   public router: Router,
   public navCtrl: NavController
 ) {}
 
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


}
