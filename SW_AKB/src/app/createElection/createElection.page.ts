import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar'
import { fileURLToPath } from 'url';

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
  
  private electionName: string='';
  private s_d: string; 
  private e_d: string; 
  private summary: string;
  private voteselect: string;
  private voteselecttype : string='0';

  
  constructor() {}

  changeVoteSelect(){
    if (this.voteselect == '보통선거') {
      this.voteselecttype = '1'
    }
      
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
    this.changeVoteSelect();
    formData.append('electionName',this.electionName);
    formData.append('startDate',this.s_d);
    formData.append('endDate',this.e_d);
    formData.append('summary',this.summary);
    formData.append('voteselecttype',this.voteselecttype);
    formData.append('excel[]', this.file, this.file.name);
    formData.append('excel[]', this.file2, this.file2.name);
    
    
    
    try {
      const response = await fetch('http://34.64.179.195:3000/uploads', {
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
}
