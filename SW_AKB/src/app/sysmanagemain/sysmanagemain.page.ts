import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component(
    {selector: 'app-home', templateUrl: 'sysmanagemain.page.html', styleUrls: ['sysmanagemain.page.scss']}
)
export class SysManagemainPage {
    public items: any;
    public ary: Array<any>;
    public state: Array<any>;
    constructor(public http : HttpClient, private alertCtrl:AlertController, private router:Router) {}
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
            this.items = result;
            this.ary = new Array(this.items.length).fill(false);
            this.state = new Array(this.items.length)
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
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
        window.location.reload()
      }catch(err){
        console.log(err);
      }
    }
}
