import { User } from './../types/user';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppSessionService } from './../app-session.service';
import { CheckInService } from './check-in.service';
import { HealthyChecklist } from './../types/healthyChecklist';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  healthyChecklist: HealthyChecklist = new HealthyChecklist();
  
  constructor(private afDb: AngularFireDatabase,
    private appSessionService: AppSessionService,
    private checkInService: CheckInService) {
   }

  ngOnInit() {
    // this.appSessionService.getUserDetail(this.appSessionService.user.email).snapshotChanges().subscribe(res =>{
    //   console.log(res);
    // });
    if (this.appSessionService.user && this.appSessionService.user.key) {
      this.checkInService.getUserHealthyChecklist(this.appSessionService.user.key).subscribe(response => {
        this.healthyChecklist.yoga = response['yoga'];
        this.healthyChecklist.morningWalk = response['morningWalk'];
        this.healthyChecklist.gym = response['gym'];
        this.healthyChecklist.eatGreenFood = response['eatGreenFood'];
        this.healthyChecklist.drinkWater = response['drinkWater'];
        this.healthyChecklist.ditchSugaryFood = response['ditchSugaryFood'];
        this.healthyChecklist.healthySleep = response['healthySleep'];
        console.log(this.healthyChecklist);
      });
    }    
  }

  onSubmit() {
    if (this.appSessionService.user && this.appSessionService.user.key) {
      this.checkInService.updateHealthyChecklist(this.appSessionService.user.key, this.healthyChecklist)
    } else {
      let keySaved = this.checkInService.insertHealthyChecklist(this.healthyChecklist).key;
      this.appSessionService.user.key = keySaved;      
      this.appSessionService.insertUser(this.appSessionService.user);
    }    
  }

}
