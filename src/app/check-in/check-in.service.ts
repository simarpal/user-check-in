import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

import { HealthyChecklist } from './../types/healthyChecklist';

@Injectable()
export class CheckInService {
  private itemsCollection: AngularFirestoreCollection<HealthyChecklist>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<HealthyChecklist>('healthyChecklist');
   }

  getUserHealthyChecklist(email: string, date: string) {
    return this.afs.collection<HealthyChecklist>('healthyChecklist', ref => ref.where('email', '==', email)
      .where('created', '==', date))
      .valueChanges();
  }

  insertHealthyChecklist(healthyChecklist: HealthyChecklist) {
    return this.itemsCollection.add(JSON.parse(JSON.stringify(healthyChecklist)));
  }
}
