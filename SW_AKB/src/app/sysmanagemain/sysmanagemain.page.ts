import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import Web3 from 'web3';

const web3 = new Web3('ws://localhost:8546');

@Component(
    {selector: 'app-home', templateUrl: 'sysmanagemain.page.html', styleUrls: ['sysmanagemain.page.scss']}
)
export class SysManagemainPage {
    public items: any;
    public items2: any;
    public ary: Array<any>;
    public state: Array<any>;
    public abi: string;
    public adminAddr: string;
    public eid: string;
    public contractAddr: string;

    constructor(public http : HttpClient, private alertCtrl:AlertController, private router:Router) {
      web3.eth.net.getId().then(console.log);
      this.abi = '[{"inputs":[{"internalType":"uint256","name":"_maxVoter","type":"uint256"},{"internalType":"uint256[]","name":"candidate_num","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"C_num","type":"uint256"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinishVoterCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxVoter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"getVoteCount","outputs":[{"internalType":"uint256","name":"cnt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWinner","outputs":[{"internalType":"uint256","name":"winner","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"candidate_num","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
    }
    ngOnInit() {
      
        
        this.make_json();
        //this.loadData();
    }
    async make_json() {
        let formData = new FormData();
        try {
            const response = await fetch('http://34.64.125.190:3000/sysmanagemain', {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response);
            await this.loadData();
        } catch (err) {
            console.log(err)
        }

    }
    async loadData() {
        let data: Observable<any>;
        data = await this
            .http
            .get('http://34.64.125.190:3000/syselectionjson');

        data.subscribe(result => {
            this.items2 = result;
            
            this.ary = new Array(this.items2.length).fill(false);
            this.state = new Array(this.items2.length)
            for (let i = 0; i < this.items2.length; i++) {
                this.state[i] = this
                    .items2[i]
                    .e_state;
                console.log(this.state[i]);
            }

        }, (error) => {
            //window.location.reload();
        })
    }

    touch(i : any) {
        if (this.ary[i] == true) {
            this.ary[i] = false;
        } else {
            this.ary[i] = true;
        }
    }

    async changefunc(item : any){
      this.alertCtrl.create({
        header:'',
        message: '정말 반려하시겠습니까?',
        buttons: [{
          text:'취소',
          role:'cancel'
        },
        {
          text:'확인',
          role:'confirm',
          handler: () => {
            this.change(item.EID);
          }
        }]
      }).then(alertEI=> {
        alertEI.present();
      })
      
    }
    async change(i: any){
      let formData = new FormData();
      formData.append('eid', i);
      try{
        const response = await fetch('http://34.64.125.190:3000/reject', {
          method:'POST',
          body : formData
        })
        if(!response.ok){
          throw new Error(response.statusText)
        }
        this.alertCtrl.create({
          header:'',
          message:'반려되었습니다.'
        }).then(alertEI => {
          alertEI.present();
        })
        window.location.reload()
      }catch(err){
        console.log(err)
      }
    }
    async toelectionInfo(item : any){
      this.router.navigate(['sysmanageElection', item.EID])
    }
    async applyfunc(item : any){
      this.alertCtrl.create({
        header:'',
        message:'승인하시겠습니까?',
        buttons:[
          {
            text:'취소'
          },
          {
            text:'확인',
            handler: () => {
              this.apply(item.EID)
            }
          }
        ]
      }).then(alertEI => {
        alertEI.present();
      })
    }

    async apply(i : any){
      let formData = new FormData();
      this.eid = i;
      formData.append('eid', i);
      

      try{
        const response = await fetch('http://34.64.125.190:3000/electionapply', {
          method:'POST',
          body: formData
        })
        if(!response.ok){
          throw new Error(response.statusText);
        }
        this.alertCtrl.create({
          header:'',
          message:'승인되었습니다.'
        }).then(alertEI => {
          alertEI.present();
        })
      this.processing();
      }catch(err){
        console.log(err);
      }
      
      
    }
    async get_electioninfo(){

      let formData = new FormData();
      formData.append('eid',this.eid);
      try {
        //localhost 용
        const response = await fetch('http://34.64.125.190:3000/getElectionInfo', {
          method: 'POST',
          body: formData,
        });
    
      
      let data:Observable<any>;
      data = await this.http.get('http://34.64.125.190:3000/electioninfojson');
  
      data.subscribe(result =>{
        this.items = result;
      
      console.log(this.items[0].total)
      console.log(this.items[0].candidate)
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
   
    
    async processing() {
      // Make New Account
      await this.get_electioninfo()
      
      await web3.eth.personal.newAccount("1234")
      .then((result) => { 
        this.adminAddr = result;
        //console.log(this.adminAddr);
       });
  
       // unlock account
       const accounts = await web3.eth.getAccounts();
       await web3.eth.personal.unlockAccount(accounts[0], "1234", 0);
       await web3.eth.personal.unlockAccount(this.adminAddr, "1234", 0);
  
       // Set 1eth for gas fee
       await web3.eth.sendTransaction({
         from: accounts[0],
         to: this.adminAddr,
         value: '1000000000000000000' //1eth
       }, function(error, hash) {
         console.log(error, "send 1eth hash: ", hash);
       })
  
       // deploy Contract
       await this.deploy();
       await this.insertDB();
       window.location.reload();
    }
  
    async insertDB(){
      let formData = new FormData();
      formData.append('eid',this.eid);
      formData.append('contractAddr',this.contractAddr);
      formData.append('adminAddr',this.adminAddr);
      try {
        //localhost 용
        const response = await fetch('http://34.64.125.190:3000/insertContract', {
          method: 'POST',
          body: formData,
        });
        
          }
          catch (err) {
            console.log(err);
          }
      }
    
    async deploy() {
      console.log('Attempting to deploy from account', this.adminAddr);
  
      //await this.loadData();
      const voteContract = await new web3.eth.Contract(JSON.parse(this.abi));
      
      const Vote = voteContract.deploy({
        data: '0x608060405234801561001057600080fd5b5060405161064238038061064283398101604081905261002f9161013a565b600280546001600160a01b03191633179055600082815560018190555b815181101561011c5781818151811061006757610067610205565b60200260200101516003600084848151811061008557610085610205565b60200260200101518152602001908152602001600020600001819055506000600360008484815181106100ba576100ba610205565b602002602001015181526020019081526020016000206001018190555060048282815181106100eb576100eb610205565b60209081029190910181015182546001810184556000938452919092200155806101148161021b565b91505061004c565b505050610244565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561014d57600080fd5b8251602080850151919350906001600160401b038082111561016e57600080fd5b818601915086601f83011261018257600080fd5b81518181111561019457610194610124565b8060051b604051601f19603f830116810181811085821117156101b9576101b9610124565b6040529182528482019250838101850191898311156101d757600080fd5b938501935b828510156101f5578451845293850193928501926101dc565b8096505050505050509250929050565b634e487b7160e01b600052603260045260246000fd5b600060001982141561023d57634e487b7160e01b600052601160045260246000fd5b5060010190565b6103ef806102536000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80633477ee2e1161005b5780633477ee2e146100d95780638db1d6e5146101155780638e7ea5b21461011d578063b2c2f2e81461012557600080fd5b80630121b93f146100825780632e4176cf14610097578063333aa17e146100c7575b600080fd5b610095610090366004610341565b610148565b005b6002546100aa906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6001545b6040519081526020016100be565b6101006100e7366004610341565b6003602052600090815260409020805460019091015482565b604080519283526020830191909152016100be565b6000546100cb565b6100cb610289565b6100cb610133366004610341565b60009081526003602052604090206001015490565b6002546001600160a01b031633146101a75760405162461bcd60e51b815260206004820152601b60248201527f486173206e6f20726967687420746f207265636f726420766f7465000000000060448201526064015b60405180910390fd5b600154600054116101eb5760405162461bcd60e51b815260206004820152600e60248201526d566f746572206f766572666c6f7760901b604482015260640161019e565b60008181526003602052604090205481146102415760405162461bcd60e51b815260206004820152601660248201527531b0b73234b230ba3290373ab6b132b91032b93937b960511b604482015260640161019e565b60016003600083815260200190815260200160002060010160008282546102689190610370565b9250508190555060018060008282546102819190610370565b909155505050565b600080805b60045481101561033c578160036000600484815481106102b0576102b0610388565b9060005260206000200154815260200190815260200160002060010154111561032a5760036000600483815481106102ea576102ea610388565b906000526020600020015481526020019081526020016000206001015491506004818154811061031c5761031c610388565b906000526020600020015492505b806103348161039e565b91505061028e565b505090565b60006020828403121561035357600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156103835761038361035a565b500190565b634e487b7160e01b600052603260045260246000fd5b60006000198214156103b2576103b261035a565b506001019056fea2646970667358221220dc4be65d17d2e26a8965f21cab12d8d711adcbe91fc67f80c0ea55c166c7bd1764736f6c634300080a0033', 
        arguments: [
              this.items[0].total,
              this.items[0].candidate,
        ]
    }).send({
        from: this.adminAddr, 
        gas: 4700000
      }, function (e, contract){
        console.log("Contract Hash: ", contract);
        
    });
    console.log("Contract addr: ", (await Vote).options.address);
    this.contractAddr = (await Vote).options.address;
  
  
    };
  
}
