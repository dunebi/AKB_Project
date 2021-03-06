import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
import { Observable } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
@Component({
  selector: 'app-home',
  templateUrl: 'manageVoter.page.html',
  styleUrls: ['manageVoter.page.scss'],
})
export class ManageVoterPage {

 public eid: string;
 public editflag=false;
 public items: any;
 public items_length: number;
 public insert = [];
 public remove = [];
 public searchinput:string="";


  constructor(private location: Location, public atrCtrl: AlertController,public http: HttpClient, private ac:ActivatedRoute) {
    
    this.make_json();
    
   
  }



  async modify_database(){


    let formData = new FormData();
    
    formData.append('eid',this.eid);
    formData.append('insert',JSON.stringify(this.insert));
    
    
    
    formData.append('remove',JSON.stringify(this.remove));
    
      const response = await fetch('http://34.64.125.190:3000/modifyVoter', {
        method: 'POST',
        body: formData,
      });

    window.location.reload()
   



  }



  async make_json(){
    this.eid = this.ac.snapshot.paramMap.get('eid');
    let formData = new FormData();
    formData.append('eid',this.eid);
    try {
      const response = await fetch('http://34.64.125.190:3000/manageVoter', {
        method: 'POST',
        body: formData,
      });
  
  
      let data:Observable<any>;
      data = await this.http.get('http://34.64.125.190:3000/voterjson');
  
      data.subscribe(result =>{
        this.items = result;
        this.items_length = this.items.length - 1
      
        
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
 
  
  async plus() {
  let alert = this.atrCtrl.create({
    header: '????????????',
    inputs: [
      {
        name: 'name',
        placeholder: '????????? ??????'
        
      },
      {
        name: 'phone',
        placeholder: '010-xxxx-xxxx',
        
      }
    ],
    buttons: [
      {
        text: '??????',
        role: 'cancel',
        handler:()=> {}
      },
      {
        text: '????????????',
        role: '',
        handler: data => {

          this.items.push({'uid' : 0, 'u_name' : data.name, 'u_phonenum' : data.phone})
          
          this.insert.push({'u_name':data.name, 'u_phonenum' : data.phone})
          console.log(this.insert)
          
        }
        
      }
    ]
  });
  (await alert).present();
}
async delete(event) {
    const al = await this.atrCtrl.create({
      header:'??????!',
      message: '???????????? ????????? ?????????????????????????',
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          
        },
        {
          text:'OK',
          role:'',
          handler:()=>{         

            if (this.items[event.target.id].uid!=0)
              this.remove.push(this.items[event.target.id].uid)
            else //?????? ?????????????????????
            {
              let removename = this.items[event.target.id].u_name;  
              let removephonenum =  this.items[event.target.id].removephonenum;    
              for (let i =0; i<this.insert.length;i++)
              {
                if (this.insert[i].u_name == removename)
                  this.insert.splice(i,1);
              }      
              
            }
          
            
            this.items.splice(event.target.id,1);
          
            
            

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
myBackButton(){
  this.location.back();
}
}
