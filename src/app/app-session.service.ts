import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

import { User } from './types/user';

@Injectable()
export class AppSessionService {
  user: User;

  constructor(private afDb: AngularFireDatabase,
    // private afs: AngularFirestore
  ) { }

  // getUserDetail(email: string) {
  //   return this.afs.collection('userDetail', ref => ref.where('email', '==', email));
  // }

  insertUser(user: User) {
    return this.afDb.list('/userDetail').push(user);
  }
}
