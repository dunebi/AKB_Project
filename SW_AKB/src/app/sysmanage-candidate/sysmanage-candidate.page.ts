import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sysmanage-candidate',
  templateUrl: './sysmanage-candidate.page.html',
  styleUrls: ['./sysmanage-candidate.page.scss'],
})
export class SysmanageCandidatePage implements OnInit {
  private eid:string;
  private items:string;

  constructor(private http:HttpClient, private ac:ActivatedRoute) { }

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
}
