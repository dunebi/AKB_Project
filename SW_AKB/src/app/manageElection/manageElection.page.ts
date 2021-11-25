
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
//import {Chart} from 'chart.js'


@Component({
  selector: 'app-home',
  templateUrl: 'manageElection.page.html',
  styleUrls: ['manageElection.page.scss'],
})
export class ManageElectionPage  implements AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;


  doughnutChart: any;


  constructor() { }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
 
    this.doughnutChartMethod();
  
  }

 
  doughnutChartMethod() {
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
      
          doughnutlabel: {
            labels: [{
              text: '550',
              font: {
                size: 20,
                weight: 'bold'
              }
            }, {
              text: 'total'
            }]
          }
        }
  

    });
  }

 
}
