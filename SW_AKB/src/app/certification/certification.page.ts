import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'certification.page.html',
  styleUrls: ['certification.page.scss'],
})
export class CertificationPage  implements OnInit {
  
  
 
  name: string; 
  phonenumber: string; 




 constructor(
   public plat:Platform,
   public router: Router,
   public navCtrl: NavController,
   public alertCtrl: AlertController,
   public ac:ActivatedRoute
 ) {}
 ngOnInit(){
 this.name= this.ac.snapshot.paramMap.get('name');
 this.phonenumber=this.ac.snapshot.paramMap.get('phonenumber');
 console.log(this.name)
 console.log(this.phonenumber)
 }

 

}
