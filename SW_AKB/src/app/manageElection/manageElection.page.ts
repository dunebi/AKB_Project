
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataLabels } from 'chartjs-plugin-labels';
import {Chartdoughnut} from 'chartjs-plugin-doughnutlabel'
import { Location } from "@angular/common";
import { Router, ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'manageElection.page.html',
  styleUrls: ['manageElection.page.scss'],
})
export class ManageElectionPage  implements AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  doughnutChart: any;
  public eid: string;
  private items : any;

  constructor(private router:Router, private ac:ActivatedRoute, private http:HttpClient, private location:Location) {
    
   }

  // When we try to call our chart to initialnpm install chartjs-plugin-labelsize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
 
    this.doughnutChartMethod();
    this.loadData();
  }

 
  doughnutChartMethod() {
    this.eid = this.ac.snapshot.paramMap.get('eid');
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['투표자', '투표안한사람'],
        datasets: [{
          label: '# of Votes',
          data: [60,40],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
        
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
            fontColor: ['green', 'red'],
            precision: 2
          },

          doughnutlabel: {
            labels: [
              {
                  text: '50%',
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
    await this.loadData_json();

    } catch(err) {
      console.log(err);
    }
    
    

  }

  async loadData_json(){
    let data : Observable<any>;
    data = await this.http.get('http://34.64.125.190:3000/electiondatajson');
    data.subscribe(result => {
      this.items = result
    })
  }

  toCandidate(){
    this.router.navigate(['manageCandiate', this.eid]);
  }

  toVoter(){
    this.router.navigate(['manageVoter', this.eid]);
  }

  myBackButton(){
    this.location.back();
  }
}