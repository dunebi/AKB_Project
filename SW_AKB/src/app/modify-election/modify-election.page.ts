import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar'
import { Location } from "@angular/common";

 
@Component({
  selector: 'app-modify-election',
  templateUrl: './modify-election.page.html',
  styleUrls: ['./modify-election.page.scss'],
})
export class ModifyElectionPage implements OnInit {
  private items:any;
  private eid:string;
  private mid:string;

  private file: File;
  private file2: File;
  private file1_name : String ="유권자 명단.xlsx"
  private file2_name : String="후보자 명단.xlsx"

  private electionName: string='';
  private s_d: string; 
  private e_d: string; 
  private summary: string;
  dateRange: { from: string; to: string; };
  type: 'string'; 
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
  };
  startday: Date;
  endday: Date;

  constructor(private location: Location,private http:HttpClient, private ac:ActivatedRoute, private alertCtrl:AlertController, private router:Router) { }

  ngOnInit() {
    this.make_json();
  }
  selectStartDate($event){
    this.startday = new Date($event.time);
    let fromy = this.startday.getFullYear();
    let fromm = this.startday.getMonth()+1;
    let fromd = this.startday.getDate();
    this.s_d=fromy+'-'+fromm+'-'+fromd;
    
  }

  selectEndDate($event){
    this.endday = new Date($event.time);
    let toy = this.endday.getFullYear();
    let tom = this.endday.getMonth()+1;
    let tod = this.endday.getDate();
    this.e_d= toy+'-'+tom+'-'+tod;
  }


  onFileChange(fileChangeEvent){
    this.file = fileChangeEvent.target.files[0];
    this.file1_name=this.file.name;
  }

  onFile2Change(fileChangeEvent){
    this.file2 = fileChangeEvent.target.files[0];
    this.file2_name = this.file2.name;
  }

  async make_json(){
    this.eid = this.ac.snapshot.paramMap.get('eid');
    this.mid = this.ac.snapshot.paramMap.get('mid');
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

  async loadData(){
    let data : Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/electiondatajson');
    data.subscribe(result => {
      this.items = result
    })
  }

  async submitMultipleForm() {
    let formData = new FormData();
    //this.mid='1'; //이후 로그인 상황에서 해당 값을 불러와야됨
    if(this.electionName==undefined||this.s_d==undefined||this.e_d==undefined||this.summary==undefined||this.file1_name==undefined||this.file2_name==undefined){
      this.alertCtrl.create({
        header: '',
        message:'입력하지 않은 내용이 존재합니다.',
        buttons: [{
          text:'확인'
        }]
      }).then(alertEl => {
        alertEl.present();
      })
    }
    else{
      formData.append('eid', this.eid);
      formData.append('mid',this.mid);
      formData.append('electionName',this.electionName);
      formData.append('startDate',this.s_d);
      formData.append('endDate',this.e_d);
      formData.append('summary',this.summary);
      formData.append('excel[]', this.file, this.file.name);
      formData.append('excel[]', this.file2, this.file2.name);
      
      try {
        //server 용
        const response = await fetch('http://34.64.125.190:3000/modifyelection', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        //console.log("넘어가나")
        this.alertCtrl.create({
          header:'',
          message:'선거가 성공적으로 저장되었습니다.'
        }).then(alertEl => {
          alertEl.present();
        })
        this.router.navigate(['managemain', this.mid]).then(() => {window.location.reload()});
      } catch (err) {
        console.log(err);
      }
    }
  }
  myBackButton(){
    this.location.back();
  }
}
