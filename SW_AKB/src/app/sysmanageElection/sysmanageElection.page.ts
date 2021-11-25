
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
//import {Chart} from 'chart.js'


@Component({
  selector: 'app-home',
  templateUrl: 'sysmanageElection.page.html',
  styleUrls: ['sysmanageElection.page.scss'],
})
export class SysManageElectionPage  implements AfterViewInit {
  

  constructor() { }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
 
    
  
  }

 

 
}
