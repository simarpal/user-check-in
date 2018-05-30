import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { CheckInService } from './check-in.service';
import { HealthyChecklist } from './../types/healthyChecklist';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckInComponent implements OnInit {
  healthyChecklist: HealthyChecklist = new HealthyChecklist();
  yesterdayHealthyChecklist: HealthyChecklist = new HealthyChecklist();
  todayDate: string = new Date().toDateString();
  id: string = '';

  constructor(public afAuth: AngularFireAuth,
    private checkInService: CheckInService,
    private router: Router) {
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        let now = new Date();
        now.setDate(now.getDate() - 1);
        let yesterdayDate: string = now.toDateString();
        this.getUserHealthyChecklist(user.email, this.todayDate);
        this.getUserHealthyChecklist(user.email, yesterdayDate);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.checkInService.updateHealthyChecklist(this.healthyChecklist, this.id);      
    } else {
      this.healthyChecklist.created = this.todayDate;
      this.healthyChecklist.email = this.afAuth.auth.currentUser.email;
      this.checkInService.insertHealthyChecklist(this.healthyChecklist);
    }    
  }

  getUserHealthyChecklist(email: string, date: string) {
    this.checkInService.getUserHealthyChecklist(email, date).subscribe(response => {
      if (response.length > 0) {
        if (date == this.todayDate) {
          this.healthyChecklist = response[0].data;
          this.id = response[0].id;
        } else {
          this.yesterdayHealthyChecklist = response[0].data;
        }
      }      
    });
  }

}
