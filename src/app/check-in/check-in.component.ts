import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  constructor(public afAuth: AngularFireAuth,
    private checkInService: CheckInService) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.afAuth.auth.currentUser) {
        let now = new Date();
        now.setDate(now.getDate() - 1);
        let yesterdayDate: string = now.toDateString();
        this.getUserHealthyChecklist(this.afAuth.auth.currentUser.email, this.todayDate);
        this.getUserHealthyChecklist(this.afAuth.auth.currentUser.email, yesterdayDate);
      }
    }, 2000);
  }

  onSubmit() {
    this.healthyChecklist.created = this.todayDate;
    this.healthyChecklist.email = this.afAuth.auth.currentUser.email;
    this.checkInService.insertHealthyChecklist(this.healthyChecklist);
  }

  getUserHealthyChecklist(email: string, date: string) {
    this.checkInService.getUserHealthyChecklist(email, date).subscribe(response => {
      if (response.length > 0) {
        if (date == this.todayDate) {
          this.healthyChecklist = response[0];
        } else {
          this.yesterdayHealthyChecklist = response[0];
        }
      }      
    });
  }

}
