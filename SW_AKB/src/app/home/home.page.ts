import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_CONFIG } from '../environment'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  
  constructor(
   
    ) {
      const app = initializeApp(FIREBASE_CONFIG);
      const analytics = getAnalytics(app);
    }
  

}
