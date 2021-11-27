import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
@Component(
    {selector: 'app-home', templateUrl: 'managemain.page.html', styleUrls: ['managemain.page.scss']}
)
export class ManagemainPage {
    public items: any;
    public temp: any;
    public admit: Array<any>;
    public notadmit: Array<any>;
    private mid: string;
    public ary: Array<any>;
    public state: Array<any>;
    public segment: string;
    private eid: string;
    constructor(
        public atrCtrl : AlertController,
        public navCtrl : NavController,
        public http : HttpClient,
        public ac : ActivatedRoute,
        public router : Router
    ) {
      
    }
    ngOnInit() {
        this.make_json();
        this.loadData();
    }
    async make_json() {
        let formData = new FormData();
        this.mid = this
            .ac
            .snapshot
            .paramMap
            .get('mid');
        formData.append('mid', this.mid);
        try {
            const response = await fetch('http://34.64.125.190:3000/managemain', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response);
            console.log('MID : ', this.mid)
            await this.loadData();
        } catch (err) {
            console.log(err);
        }
    }
    segmentChanged(event) {
        this.segment = event.detail.value;

        if (this.segment == "전체") {
            this.items = this.temp;
        } else if (this.segment == "승인") {
            this.items = this.admit;
        } else {
            this.items = this.notadmit;
        }

    }
    async loadData() {
        let data: Observable<any>;
        data = await this
            .http
            .get('http://34.64.125.190:3000/electionjson');

        data.subscribe(result => {
            this.items = result;
            this.temp = this.items;
            console.log(this.items.length)
            this.ary = new Array(this.items.length).fill(false);
            this.state = new Array(this.items.length)
            this.admit = new Array(this.items.length).fill(null);
            this.notadmit = new Array(this.items.length).fill(null);
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
                    .e_state;
                console.log(this.state[i]);
                if (this.items[i].e_state == "저장완료" || this.items[i].e_state == "심사중") {
                    this.notadmit[i] = this.items[i]
                    console.log(this.notadmit[i]);
                } else {
                    this.admit[i] = this.items[i]
                    console.log(this.admit[i])
                }
            }

        }, (error) => {
            //window.location.reload();
        })
    }
    touch(i) {
        if (this.ary[i] == true) {
            this.ary[i] = false;
        } else {
            this.ary[i] = true;
        }
    }
    async getElection(item : any) {
        this.eid = item.EID;
        this
            .router
            .navigate(['manageElection', this.eid]);
    }

    async deletefunc(item : any) {
        this.eid = item.EID;
        this
            .atrCtrl
            .create({
                header: '',
                message: '해당 선거를 삭제하시겠습니까?',
                buttons: [
                    {
                        text: '취소',
                        role: 'cancle'
                    }, {
                        text: '확인',
                        role: 'confirm',
                        handler: () => {
                          this.delete(this.eid)
                        }
                    }
                ]
            })
            .then(alertEl => {
                alertEl.present();
            })

    }
    async delete(i : any) {
        let formData = new FormData();
        formData.append('eid', i);
        try {
            const response = await fetch('http://34.64.125.190:3000/delete', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response)
            this.atrCtrl.create({
              header:'',
              message: '삭제가 완료되었습니다.'
            })
            .then(alertEl => {
              alertEl.present();
            })
            window.location.reload();
        } catch (err) {
            console.log("error!")
            console.log(err);
        }
    }
    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms) );
    }
    createElection(){
      this.router.navigate(['createElection', this.mid]);
    }
}
