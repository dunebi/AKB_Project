import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'showCandiate.page.html',
  styleUrls: ['showCandiate.page.scss'],
})
export class ShowCandiatePage {

  private eid:string;
  private items:string;

  constructor(private location:Location,private http:HttpClient, private ac:ActivatedRoute) { }

  ngOnInit() {
    this.eid = this.ac.snapshot.paramMap.get("eid");
    this.make_json();
  }

  async make_json(){

    let formData = new FormData();
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
