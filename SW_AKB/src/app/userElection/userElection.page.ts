
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataLabels } from 'chartjs-plugin-labels';
import {Chartdoughnut} from 'chartjs-plugin-doughnutlabel'
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http'; 
import Web3 from 'web3';
import { AlertController } from '@ionic/angular';

const web3 = new Web3('ws://localhost:8546');
let _this;

@Component({
  selector: 'app-home',
  templateUrl: 'userElection.page.html',
  styleUrls: ['userElection.page.scss'],
})
export class UserElectionPage  implements AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  abi: string='[{"inputs":[{"internalType":"uint256","name":"_maxVoter","type":"uint256"},{"internalType":"uint256[]","name":"candidate_num","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"C_num","type":"uint256"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinishVoterCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxVoter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"getVoteCount","outputs":[{"internalType":"uint256","name":"cnt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWinner","outputs":[{"internalType":"uint256","name":"winner","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  eid: string;
  uid: string;
  items:any;
  load_items:any;
  contractAddr: string;
  adminAddr: string;
  endVoterCnt: any;
  maxVoterCnt: any;
  getVoterCnt :any = [];
  voteRate: String;
  voteCnt: String;
  doughnutChart: any;
  ustate: string;


  constructor(private router:Router, private ac:ActivatedRoute,private location: Location,public http:HttpClient,private alertCtrl:AlertController,) { _this = this;
    this.eid = this.ac.snapshot.paramMap.get('eid');
    this.uid = this.ac.snapshot.paramMap.get('uid');
    this.ustate = this.ac.snapshot.paramMap.get('ustate');
    
    this.loadData();
    
  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
   
    
   
    //this.doughnutChartMethod();
  
  }

  async process() {
    let formData = new FormData();
    
    formData.append('eid', this.eid);
    try {
        const response = await fetch('http://34.64.125.190:3000/makejson_voteCandidate', {
        method: 'POST',
        body: formData,
      });
      let data:Observable<any>;
      data = await this.http.get('http://34.64.125.190:3000/get_address');

      data.subscribe(result =>{
        this.items = result;
  
        // getData
        this.adminAddr = this.items[0].account;
        this.contractAddr = this.items[0].contract;
        this.getEndVoterCnt();
        //this.getVoteCountCall()
       
        console.log(this.items);
       
      }, (error) => {})
        if (!response.ok) {
          throw new Error(response.statusText);
          
        }
        console.log(response);
    } catch (err) {
      console.log(err);
    }

    
  }
  
  async getEndVoterCnt() {
    var contract = new web3.eth.Contract(JSON.parse(this.abi), this.contractAddr);

    await contract.methods.getFinishVoterCount().call()
    .then(function(result) {
      _this.endVoterCnt = result;
      _this.getVoterCnt.push(parseInt(result));
    });

    await contract.methods.getMaxVoter().call()
    .then(function(result) {
      _this.maxVoterCnt = result;
      _this.getVoterCnt.push(parseInt(result) - parseInt(_this.endVoterCnt));
    })

    this.voteRate = (((this.endVoterCnt) / (this.maxVoterCnt)) * 100).toFixed(2).toString() + '%';
    console.log(this.voteRate);

    this.voteCnt = ((this.endVoterCnt).toString()) + '/' + ((this.maxVoterCnt - this.endVoterCnt).toString());
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    
      type: 'doughnut',
      data: {
        labels: ['투표완료','미투표'],
        datasets: [{
          label: '# of Votes',
          data: this.getVoterCnt,
          backgroundColor: [
          
            '#3B7AE1',
            '#BDBDBD',
          
        
             
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384'
        
          ]
        }]
      },
      options: {
     
        plugins:  { 
      
          ChartDataLabels,
          Chartdoughnut,
        
          labels: {
            render: 'percentage',
            fontColor: ['white','white',],
            precision: 2
          },
          doughnutlabel: {
            labels: [
              {
                  text: this.voteRate,
                  font: {
                  size: '30',
                  weight: 'bold',
                  }
            },{
                text: '투표율',
                font: {
                size: '20',
                weight: 'bold',
              }
            },
            ]
          }
          ,  
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
        }
    });
  } 
  
  async loadData(){
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
    let data : Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/electiondatajson');
    data.subscribe(result => {
      this.load_items = result
      console.log(this.load_items)
    })

    } catch(err) {
      console.log(err);
    }
    await this.process();
    

  }
  

  showCandidate(){
    this.router.navigate(['showCandiate', this.eid]);
  }

  toVote(item : any){
    if(this.ustate=="투표완료")
    {
      this.alertCtrl.create({
        header: '',
        message: '이미 투표를 완료 하였습니다.',
        buttons: [{
          text: '확인',
          role: 'cancel',
          handler: () => {

            //window.location.reload();
          // _this.router.navigate(['usermain',  this.uid]);
          
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });

    }
    else{
    this.router.navigate(['vote', this.eid,this.uid]);
  }
}

  myBackButton(){
    this.location.back();
  }
}
