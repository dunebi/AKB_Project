import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sysmanage-voter',
  templateUrl: './sysmanage-voter.page.html',
  styleUrls: ['./sysmanage-voter.page.scss'],
})
export class SysmanageVoterPage implements OnInit {
  private eid:string;
  private items:any;
  public items_length: number;
  constructor(private http:HttpClient, private ac:ActivatedRoute) { 
    this.make_json();
  }

  ngOnInit() {
  }
  async make_json(){
    this.eid = this.ac.snapshot.paramMap.get('eid');
    let formData = new FormData();
    //this.eid='1';
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
}
