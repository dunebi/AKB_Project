import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Location } from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

@Component(
    {selector: 'app-home', templateUrl: 'managelogin.page.html', styleUrls: ['managelogin.page.scss']}
)
export class ManageloginPage {
    private m_id: string;
    private m_password: string;
    private MID: Number;
    public items: any;

    constructor(
        private location: Location,
        public http : HttpClient,
        public navCtrl : NavController,
        public router : Router,
        private alertCtrl : AlertController
    ) {}
    async CertificationNumber() {
        let formData = new FormData();
        if (this.m_id === undefined || this.m_password === undefined) {
            this
                .alertCtrl
                .create({
                    header: '',
                    message: '내용을 모두 입력해주세요',
                    buttons: [
                        {
                            text: '확인',
                            role: 'cancel'
                        }
                    ]
                })
                .then(alertEI => {
                    alertEI.present();
                });

        } else {
            formData.append('m_id', this.m_id);
            formData.append('m_password', this.m_password);
            try {
                //server 용
                const response = await fetch('http://34.64.125.190:3000/managelogin', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                console.log(response);
                await this.loadData();
            } catch (err) {
                console.log('error!')
                console.log(err);
            }

        }

    }
    async loadData(){
        let data: Observable<any>;
        data = await this
                    .http
                    .get('http://34.64.125.190:3000/loginresult');
        data.subscribe(result => {
            this.items = result;
            console.log(this.items);
            console.log(typeof(this.items));
            this.MID = this.items;
            console.log(this.MID)
            if (this.MID === 0) {
                this
                .alertCtrl
                .create({
                    header: '로그인 오류',
                    message: '아이디 혹은 비밀번호가 틀립니다. 다시 입력해 주십시오.',
                    buttons: [
                    {
                        text: '확인',
                        role: 'cancel',
                        handler: data => {
                            this.m_id = undefined;
                            this.m_password = undefined;
                        }
                    }
                    ]
                    })
                    .then(alertEI => {
                        alertEI.present();
                    });
                    } else {
                        this
                            .router
                            .navigate(['managemain', this.MID]);
                    }
                }, (error) => {
                    //this.loadData();
                })
    }
    myBackButton(){
        this.location.back();
      }

}
