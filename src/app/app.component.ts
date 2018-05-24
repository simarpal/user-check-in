import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private afAuth: AngularFireAuth) {
    console.log(afAuth);
   }


  logout() {
    this.afAuth.auth.signOut();
  }
}
