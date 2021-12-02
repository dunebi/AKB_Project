
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataLabels } from 'chartjs-plugin-labels';
import {Chartdoughnut} from 'chartjs-plugin-doughnutlabel'
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'; 
import {Router, ActivatedRoute} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import Web3 from 'web3';


const web3 = new Web3('ws://localhost:8546');
let _this;
@Component({
  selector: 'app-home',
  templateUrl: 'showresult.page.html',
  styleUrls: ['showresult.page.scss'],
})
export class ShowresultPage  implements AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  doughnutChart: any;
  eid: string;
  items: any;
  abi: string='[{"inputs":[{"internalType":"uint256","name":"_maxVoter","type":"uint256"},{"internalType":"uint256[]","name":"candidate_num","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"C_num","type":"uint256"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinishVoterCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxVoter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"getVoteCount","outputs":[{"internalType":"uint256","name":"cnt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWinner","outputs":[{"internalType":"uint256","name":"winner","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  contractAddr: string;
  candidatenum: any;
  adminAddr: string;
  items2: any;
  candidate :any = [];
  candidate_num :any =[];
  getvote :any = [];
  endVoterCnt: any;
  maxVoterCnt: any;
  voteRate: String;
  winnerIndex: number;
  winner: String;

  constructor(private location: Location,public http:HttpClient, private ac:ActivatedRoute) { 
    _this=this;
    this.winnerIndex = 0;
  }

  // When we try to call our chart to initialnpm install chartjs-plugin-labelsize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    this.make_json()
    
    
  }

 
  async make_json(){

    let formData = new FormData();
    this.eid = this.ac.snapshot.paramMap.get('eid');
    formData.append('eid',this.eid);
    try {
      //localhost 용
      const response = await fetch('http://34.64.125.190:3000/makejson_voteCandidate', {
        method: 'POST',
        body: formData,
      });
  
    
    let data:Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/get_voteCandidatejson');

    data.subscribe(result =>{
      this.items = result;
      for(let i =0;i<this.items.length;i++)
      {
        this.candidate.push(this.items[i].c_name);
        this.candidate_num.push(this.items[i].c_num);
      }
      console.log(this.candidate)
      console.log(this.candidate_num)
      console.log(this.items);
    }, (error) => {

  
    })

    data = await this.http.get('http://34.64.125.190:3000/get_address');

    data.subscribe(result =>{
      this.items2 = result;

      // getData
      this.adminAddr = this.items2[0].account;
      this.contractAddr = this.items2[0].contract;
      this.getVoteCountCall()

      console.log(this.items2);
     
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
   
  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.candidate,
        datasets: [{
          label: '# of Votes',
          data: this.getvote,
          backgroundColor: [
            '#F94144','#F8961E','#F9C74F','#90BE6D','#43AA8B'
        

        
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
            fontColor: ['white', 'white','white','white','white'],
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
        

        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
        }
    });
  }
  myBackButton(){
    this.location.back();
  }
 
   
  async getVoteCountCall() {
    var contract = new web3.eth.Contract(JSON.parse(this.abi), this.contractAddr);
    let maxVoteCnt = 0;
    web3.eth.personal.unlockAccount(this.adminAddr, "1234", 0);

    for(let i = 0; i < this.candidate_num.length; i++) {
     await contract.methods.getVoteCount(this.candidate_num[i]).call().then(function(result)
     {
        if(maxVoteCnt < result) _this.winnerIndex = i;
        _this.getvote.push(parseInt(result))
     }
     );
    }
    console.log(this.getvote);

    await contract.methods.getFinishVoterCount().call()
    .then(function(result) {
      _this.endVoterCnt = result;
      console.log(result);
    });

    await contract.methods.getMaxVoter().call()
    .then(function(result) {
      _this.maxVoterCnt = result;
      console.log(result);
    })

    this.voteRate = (((this.endVoterCnt) / (this.maxVoterCnt)) * 100).toFixed(2).toString() + '%';
    console.log(this.voteRate);
    console.log(this.candidate[this.winnerIndex]);
    this.winner = this.candidate[this.winnerIndex];
    this.doughnutChartMethod();
  }


 
}