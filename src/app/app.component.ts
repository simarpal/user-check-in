import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
  }
  
  async ngOnInit() {
    let loginUser = await this.afAuth.user;
    if (loginUser) {
      this.router.navigate(['/check-in']);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);    
  }
}
