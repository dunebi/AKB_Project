import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { SysManagemainPage } from '../sysmanagemain/sysmanagemain.page';
@Component({
  selector: 'app-home',
  templateUrl: 'sysmanageElection.page.html',
  styleUrls: ['sysmanageElection.page.scss'],
})
export class SysManageElectionPage{
  private eid:string;
  private items:any;

  constructor(private location:Location,private router:Router, private ac:ActivatedRoute, private http:HttpClient) { 
    this.make_json()
  }

  async make_json(){
    this.eid = this.ac.snapshot.paramMap.get('eid');
    let formData = new FormData();
    formData.append('eid', this.eid);
    try{
      const response = await fetch('http://34.64.125.190:3000/getelectiondata' , {
      method : 'POST',
      body : formData
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    console.log(response)
    await this.loadData();

    } catch(err) {
      console.log(err);
    }
  }
  myBackButton(){
    this.router.navigate(['sysmanagemain']);
  }
  async loadData(){
    let data : Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/electiondatajson');
    data.subscribe(result => {
      this.items = result
    })
  }

  async tosysmanageVoter(){
    this.router.navigate(['sysmanage-voter', this.eid])
  }

  async tosysmanageCandidate(){
    this.router.navigate(['sysmanage-candidate', this.eid])
  }
}
