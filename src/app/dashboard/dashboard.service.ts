import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { HealthyChecklist } from './../types/healthyChecklist';

@Injectable()
export class DashboardService {
  private healthyChecklistsCollection: AngularFirestoreCollection<HealthyChecklist>;

  constructor(private afs: AngularFirestore) {
    this.healthyChecklistsCollection = afs.collection<HealthyChecklist>('healthyChecklist');
  }

  getUserHealthyChecklist(email: string, date: string) {
    return this.afs.collection<HealthyChecklist>('healthyChecklist', ref => ref.where('email', '==', email).where('created', '==', date))
      .snapshotChanges()
      .pipe(map(healthyChecklists => {
        return healthyChecklists.map(healthyChecklist => {
          let data = healthyChecklist.payload.doc.data();
          let id = healthyChecklist.payload.doc.id;
          return { id, data }
        })
      }))
  }

  insertHealthyChecklist(healthyChecklist: HealthyChecklist) {
    return this.healthyChecklistsCollection.add(JSON.parse(JSON.stringify(healthyChecklist)));
  }

  updateHealthyChecklist(healthyChecklist: HealthyChecklist, id: string) {
    let healthyChecklistDoc = this.afs.doc<HealthyChecklist>('healthyChecklist/' + id);
    return healthyChecklistDoc.update(JSON.parse(JSON.stringify(healthyChecklist)));
  }
}
