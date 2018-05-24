import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import { HealthyChecklist } from './../types/healthyChecklist';

@Injectable()
export class CheckInService {

  constructor(private afDb: AngularFireDatabase) { }

  getUserHealthyChecklist(key: string) {
    return this.afDb.object('healthyChecklist/' + key).valueChanges();
  }

  insertHealthyChecklist(healthyChecklist: HealthyChecklist) {
    return this.afDb.list('/healthyChecklist').push(healthyChecklist);
  }

  updateHealthyChecklist(key: string, healthyChecklist: HealthyChecklist) {
    return this.afDb.list('/healthyChecklist').update(key, healthyChecklist);
  }
}
