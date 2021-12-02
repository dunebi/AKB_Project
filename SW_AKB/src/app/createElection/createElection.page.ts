import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar'
import { fileURLToPath } from 'url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-home',
  templateUrl: 'createElection.page.html',
  styleUrls: ['createElection.page.scss'],
})
export class CreateElectionPage {
  dateRange: { from: string; to: string; };
  type: 'string'; 
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
  
  };
  startday: Date;
  endday: Date;
  
  private file: File;
  private file2: File;
  private file1_name : String ="유권자 명단.xlsx"
  private file2_name : String="후보자 명단.xlsx"
  
  private mid: string;
  private electionName: string='';
  private s_d: string; 
  private e_d: string; 
  private summary: string;
  private voteselect: string;
  private voteselecttype : string='0';
  private item:any;

  
  constructor(private location:Location,private http:HttpClient, private alertCtrl:AlertController, private router:Router, private ac:ActivatedRoute) {
    this.mid = this.ac.snapshot.paramMap.get('mid');
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
      formData.append('mid',this.mid);
      formData.append('electionName',this.electionName);
      formData.append('startDate',this.s_d);
      formData.append('endDate',this.e_d);
      formData.append('summary',this.summary);
      formData.append('excel[]', this.file, this.file.name);
      formData.append('excel[]', this.file2, this.file2.name);
      
      try {
        //server 용
        const response = await fetch('http://34.64.125.190:3000/uploads', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        console.log("넘어가나")
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
