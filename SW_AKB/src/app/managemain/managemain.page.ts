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
    ) {}
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
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
                    .e_state;
        }
    } else if (this.segment == "승인") {
            this.items = this.admit;
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
                    .e_state;
    }
        } else {
            this.items = this.notadmit;
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
                    .e_state;}
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
            this.admit = [];
            this.notadmit = [];
            for (let i = 0; i < this.items.length; i++) {
                this.state[i] = this
                    .items[i]
                    .e_state;
                console.log(this.state[i]);
                if (this.items[i].e_state == "저장완료" || this.items[i].e_state == "심사중" || this.items[i].e_state=="반려") {
                    this.notadmit.push(this.items[i]);
                    console.log(this.notadmit);
                } else {
                    this.admit.push(this.items[i]);
                    console.log(this.admit)
                }
            }
           

        }, (error) => {
            //window.location.reload();
        })
    }
    touch(i) {
        console.log(this.items[i])
        if(this.items[i].e_state=="선거종료")
        {
            this
            .router
            .navigate(['showresult', this.items[i].EID]);
        }
        else{
        if (this.ary[i] == true) {
            this.ary[i] = false;
        } else {
            this.ary[i] = true;
        }
       }
    }
    async getElection(item : any) {
        this.eid = item.EID;
        this
            .router
            .navigate(['manageElection', this.eid,this.mid]);
    }

    async deletefunc(item : any) {
        if(item.e_state=="심사중"||item.e_state=="승인완료")
        {
            this
            .atrCtrl
            .create({
                header: '',
                message: '해당선거는 삭제하실 수 없습니다.',
                buttons: [
                    {
                        text: '확인',
                  
                    }, 
                ]
            })
            .then(alertEl => {
                alertEl.present();
            })
        }
    else
    {
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
            this
                .atrCtrl
                .create({header: '', message: '삭제가 완료되었습니다.'})
                .then(alertEl => {
                    alertEl.present();
                })
            window
                .location
                .reload();
        } catch (err) {
            console.log("error!")
            console.log(err);
        }
    }
    async modify(item : any){
        if(item.e_state=="심사중"||item.e_state=="승인완료")
        {
            this
            .atrCtrl
            .create({
                header: '',
                message: '해당선거는 수정하실 수 없습니다.',
                buttons: [
                    {
                        text: '확인',
                  
                    }, 
                ]
            })
            .then(alertEl => {
                alertEl.present();
            })
        }
        else{
        this.router.navigate(['/modify-election', item.EID, this.mid]).then(()=>{window.location.reload()})
        }
    }

    async applyfunc(item : any) {
        if(item.e_state=="심사중"||item.e_state=="승인완료")
        {
            this
            .atrCtrl
            .create({
                header: '',
                message: '이미 승인신청을 완료한 선거입니다.',
                buttons: [
                    {
                        text: '확인',
                  
                    }, 
                ]
            })
            .then(alertEl => {
                alertEl.present();
            })
        }
else{

        this
            .atrCtrl
            .create({
                header: '',
                message: '심사가 시작되면 더이상 정보를 수정할 수 없습니다. 이대로 진행하시겠습니까?',
                buttons: [
                    {
                        text: '취소',
                        role: 'cancel'
                    }, {
                        text: '확인',
                        role: 'confirm',
                        handler: () => {
                            this.apply(item.EID);
                        }
                    }
                ]
            })
            .then(alertEl => {
                alertEl.present();
            })
        }
    }

    async apply(i : any){
        let formData = new FormData();
        formData.append('eid', i);
        try {
            const response = await fetch('http://34.64.125.190:3000/changeestate', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            console.log(response)
            this.atrCtrl.create({
                header:'',
                message:'심사요청을 보냈습니다.'
            }).then(alertEl => {
                alertEl.present();
            })
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }
    createElection() {
        this
            .router
            .navigate(['createElection', this.mid]);
    }
    gohome(){
        this
        .atrCtrl
        .create({
            header: '',
            message: '정말로 로그아웃을 하시겠습니까?',
            buttons: [
                {
                    text: '취소',
                    role: 'cancel'
                }, {
                    text: '확인',
                    role: 'confirm',
                    handler: () => {
                        this
                        .router
                        .navigate(['home']);
                    }
                }
            ]
        })
        .then(alertEl => {
            alertEl.present();
        })


        
    }
}
