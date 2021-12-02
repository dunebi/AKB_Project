import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
@Component({
  selector: 'app-home',
  templateUrl: 'manageCandiate.page.html',
  styleUrls: ['manageCandiate.page.scss'],
})
export class ManageCandiatePage {
  public eid: string;
  public items: any;
  public remove = [];

  constructor(private location:Location, public atrCtrl: AlertController,public http: HttpClient) {this.make_json()}


  async delete(event) {
    const al = await this.atrCtrl.create({
      header:'확인!',
      message: '후보자를 정말로 삭제하시겠습니까?',
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
          text:'OK',
          role:'',
          handler:()=>{         

            this.remove.push(this.items[event.target.id].c_num)         
            this.items.splice(event.target.id,1);
            console.log(this.remove)
            this.modify_database();
            this.remove = [];
            console.log(this.remove)
        }
      }
      ]
    });
    await al.present();
  }

  async modify_database(){


    let formData = new FormData();
    
    formData.append('eid',this.eid);
  
    formData.append('remove',JSON.stringify(this.remove));
    
      const response = await fetch('http://34.64.125.190:3000/removeCandidate', {
        method: 'POST',
        body: formData,
      });

    window.location.reload()
   



  }



  async make_json(){

    let formData = new FormData();
    this.eid='3';
    formData.append('eid',this.eid);
    try {
      const response = await fetch('http://34.64.125.190:3000/manageCandidate', {
        method: 'POST',
        body: formData,
      });
  
  
      let data:Observable<any>;
      data = await this.http.get('http://34.64.125.190:3000/candidatejson');
  
      data.subscribe(result =>{
        this.items = result;
        
      
        
        console.log(this.items)
      
      }, (error) => {
  
      
      })
      if (!response.ok) {
        throw new Error(response.statusText);
        
      }
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }

    


   }



   myBackButton(){
    this.location.back();
  }


}
