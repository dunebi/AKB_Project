import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'usermain.page.html',
  styleUrls: ['usermain.page.scss'],
})
export class UsermainPage {
  private uid: string; //이후 파라미터  불러오면서 수정
  private items: any;
  constructor(private http:HttpClient, private ac:ActivatedRoute) {
    this.makejson();
  }

  async makejson(){
    this.uid = this.ac.snapshot.paramMap.get('uid');
    let formData = new FormData();
    formData.append('uid', this.uid);
    try{
      const response = await fetch('http://34.64.125.190:3000/usermain', {
        method: 'POST',
        body: formData
      });
      if(!response.ok){
        throw new Error(response.statusText)
      }
      console.log(response)
      await this.loadData();

    } catch(err){
      console.log(err)
    }
    

  }
  async loadData(){
    let data : Observable<any>;
    data = this.http.get('http://34.64.125.190:3000/uelectionjson');
    data.subscribe(result => {
      this.items = result
    })
  }

}
