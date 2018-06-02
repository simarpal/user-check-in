import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  olderHealthyChecklist: HealthyChecklist;
  todayHealthyChecklist: HealthyChecklist = new HealthyChecklist();  
  todayDate: string = new Date().toDateString();
  yesterdayDate: NgbDateStruct;
  id: string = '';
  noRecordFound: boolean = false;
  processing: boolean = false;

  constructor(public afAuth: AngularFireAuth,
    private dashboardService: DashboardService,
    private router: Router) {
    this.getUser();
  }

  ngOnInit() {}

  getUser() {
    let user$ = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserHealthyChecklist(user.email, this.todayDate);
      } else {
        this.router.navigate(['/login']);
      }
      user$.unsubscribe();
    });
    let now = new Date();
    now.setDate(now.getDate() - 1);
    let yDate = new Date(now);
    this.yesterdayDate = { year: yDate.getFullYear(), month: yDate.getMonth() + 1, day: yDate.getDate() };
  }

  onSubmit() {
    this.processing = true;
    if (this.id) {
      this.dashboardService.updateHealthyChecklist(this.todayHealthyChecklist, this.id).then(res => {
        this.processing = false;
      }, err => {
        this.processing = false;
      });
    } else {
      this.todayHealthyChecklist.created = this.todayDate;
      this.todayHealthyChecklist.email = this.afAuth.auth.currentUser.email;
      this.dashboardService.insertHealthyChecklist(this.todayHealthyChecklist).then(res => {
        this.processing = false;
      }, err => {
        this.processing = false;
      });
    }    
  }

  getUserHealthyChecklist(email: string, date: string) {
    this.dashboardService.getUserHealthyChecklist(email, date).subscribe(response => {
      if (response.length > 0) {
        if (date == this.todayDate) {
          this.todayHealthyChecklist = response[0].data;
          this.id = response[0].id;
        } else {
          this.olderHealthyChecklist = response[0].data;
        }
      } else if (date != this.todayDate) {
        this.noRecordFound = true;
      }      
    });
  }

  onDateSelection(date: NgbDateStruct) {
    this.noRecordFound = false;    
    let selectedDate = new Date(date.year, date.month - 1, date.day);
    this.getUserHealthyChecklist(this.afAuth.auth.currentUser.email, selectedDate.toDateString());    
  }
}
