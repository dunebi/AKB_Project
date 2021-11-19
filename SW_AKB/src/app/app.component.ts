import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_CONFIG } from './environment'



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
   
  ) {
    const app = initializeApp(FIREBASE_CONFIG);
    const analytics = getAnalytics(app);
  }

  
}
