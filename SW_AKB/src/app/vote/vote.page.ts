import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'; 
import Web3 from 'web3';
import {Router, ActivatedRoute} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Location } from "@angular/common";

let _this;
const web3 = new Web3('ws://localhost:8546');
@Component({
  selector: 'app-home',
  templateUrl: 'vote.page.html',
  styleUrls: ['vote.page.scss'],
})
export class VotePage implements OnInit {
  eid: string;
  uid: string; 
  items: any;
  items2: any;
  abi: string='[{"inputs":[{"internalType":"uint256","name":"_maxVoter","type":"uint256"},{"internalType":"uint256[]","name":"candidate_num","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"C_num","type":"uint256"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinishVoterCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxVoter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"getVoteCount","outputs":[{"internalType":"uint256","name":"cnt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWinner","outputs":[{"internalType":"uint256","name":"winner","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  contractAddr: string;
  candidatenum: any;
  adminAddr: string;

  constructor(
    private location:Location,
    private alertCtrl:AlertController,
    public router : Router,
    private http:HttpClient, private ac:ActivatedRoute) {
     _this = this;
  
    
  }

  ngOnInit() {
    this.eid = this.ac.snapshot.paramMap.get('eid');
    console.log(this.eid)
    this.uid = this.ac.snapshot.paramMap.get('uid');
    this.make_json();
  }

  voteChange(event) {
    this.candidatenum = event.detail.value;
    console.log(this.candidatenum);
  }
  async make_json(){

    let formData = new FormData();
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
    
      console.log(this.items);
    }, (error) => {

  
    })

    data = await this.http.get('http://34.64.125.190:3000/get_address');

    data.subscribe(result =>{
      this.items2 = result;

      // DB에 바껴서 들어가있음..
      this.adminAddr = this.items2[0].account;
      this.contractAddr = this.items2[0].contract;
    
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

   async update_vote(){

    let formData = new FormData();
    formData.append('eid',this.eid);
    formData.append('uid',this.uid);
    try {
      //localhost 용
      const response = await fetch('http://34.64.125.190:3000/update_Voter', {
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
   
  voteCall() {
    var contract = new web3.eth.Contract(JSON.parse(this.abi), this.contractAddr);
    web3.eth.personal.unlockAccount(this.adminAddr, "1234", 0);
    this.update_vote();
    contract.methods.vote(this.candidatenum).send({from: this.adminAddr}, function(e, result) {
        console.log("vote method called. e: ", e, "result: ", result);
       
        return _this.alertCtrl.create({
          header: '',
          message: '투표가 완료되었습니다.',
          buttons: [{
            text: '확인',
            role: 'cancel',
            handler: () => {

              //window.location.reload();
             _this.router.navigate(['usermain',  _this.uid]).then(()=>{window.location.reload()});
            
            }
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      })
  }
  
  getVoteCountCall() {
    var contract = new web3.eth.Contract(JSON.parse(this.abi), this.contractAddr);

    for(let i = 0; i < this.items2.candidate[0].length; i++) {
    contract.methods.getVoteCount(this.items2.candidate[0][i]).call()
    .then(console.log);
    }
  }
  myBackButton(){
    this.location.back();
  }
}
