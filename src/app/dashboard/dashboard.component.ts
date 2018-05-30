import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { HealthyChecklist } from './../types/healthyChecklist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  healthyChecklist: HealthyChecklist = new HealthyChecklist();
  yesterdayHealthyChecklist: HealthyChecklist = new HealthyChecklist();
  todayDate: string = new Date().toDateString();
  id: string = '';

  constructor(public afAuth: AngularFireAuth,
    private dashboardService: DashboardService,
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
      this.dashboardService.updateHealthyChecklist(this.healthyChecklist, this.id);      
    } else {
      this.healthyChecklist.created = this.todayDate;
      this.healthyChecklist.email = this.afAuth.auth.currentUser.email;
      this.dashboardService.insertHealthyChecklist(this.healthyChecklist);
    }    
  }

  getUserHealthyChecklist(email: string, date: string) {
    this.dashboardService.getUserHealthyChecklist(email, date).subscribe(response => {
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
