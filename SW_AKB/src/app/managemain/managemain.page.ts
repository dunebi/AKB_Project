import { Component,OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'managemain.page.html',
  styleUrls: ['managemain.page.scss'],
})
export class ManagemainPage implements OnInit{
  public items:any;
  public temp:any; 
  public admit:Array<any>;
  public notadmit:Array<any>;
  private mid : string;
  public ary: Array<any>;
  public state: Array<any>;
  public segment: string;
  constructor(public atrCtrl: AlertController,public navCtrl: NavController,public http: HttpClient) {
    this.make_json();
    this.loadData();
  }
  async make_json(){
    let formData = new FormData();
    this.mid='1';
    formData.append('mid',this.mid);
    try {
      //server 용
      //const response = await fetch('', {

      //localhost 용
      const response = await fetch('http://34.64.125.190:3000/managemain', {
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
  ngOnInit()
  {
  

  }
  segmentChanged(event){
    this.segment=event.detail.value;
    
    if(this.segment=="전체")
    {
        this.items=this.temp;
    }
    else if(this.segment=="승인")
    {
       this.items=this.admit;
    }
    else{
      this.items=this.notadmit;
    }
    
  }
  async loadData(){
    let data:Observable<any>;

    //server 용
    //data = this.http.get('');

    //localhost 용
    data = this.http.get('http://34.64.125.190:3000/electionjson');

    data.subscribe(result =>{
      this.items = result;
      this.temp=this.items;
      console.log(this.items.length)
      this.ary=new Array( this.items.length).fill(false);
      this.state= new Array(this.items.length)
      this.admit=new Array(this.items.length).fill(null);
      this.notadmit=new Array(this.items.length).fill(null);
      for( let i=0; i<this.items.length; i++)
      {
      this.state[i]=this.items[i].e_state;
      console.log(this.state[i]);
      if(this.items[i].e_state=="저장완료"||this.items[i].e_state=="심사중")
      {
        this.notadmit[i]=this.items[i]
        console.log(this.notadmit[i]);
      }
      else{
        this.admit[i]=this.items[i]
        console.log(this.admit[i])
      }
      }
    
    }, (error) => {

      window.location.reload();
    })
  }
  touch(i)
  {
   if( this.ary[i]==true){
     this.ary[i]=false;
   }
   else{
     this.ary[i]=true;
   }
  }
  

}
