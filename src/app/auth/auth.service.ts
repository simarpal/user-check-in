import { firebase } from '@firebase/app';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {

  registerUser(formValue) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  loginWithEmail(formValue) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

}
