import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
    private router: Router) {
  }
  
  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut().then(success => {
      this.router.navigate(['/login']);      
    });
  }
}
