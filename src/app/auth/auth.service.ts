import { firebase } from '@firebase/app';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

}
