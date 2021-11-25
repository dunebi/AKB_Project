import { Component } from '@angular/core';
import {AlertController} from "@ionic/angular";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'managemain.page.html',
  styleUrls: ['managemain.page.scss'],
})
export class ManagemainPage {
  public items:any;
  private mid : string;
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
  async loadData(){
    let data:Observable<any>;

    //server 용
    //data = this.http.get('');

    //localhost 용
    data = this.http.get('http://34.64.125.190:3000/electionjson');

    data.subscribe(result =>{
      this.items = result;
    }, (error) => {

      window.location.reload();
    })
  }
}
