import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

const actionCodeSettings = {
  // production url
  url: 'https://user-check-in.firebaseapp.com/login',

  // local url
  // url: 'http://localhost:4200/login',
  handleCodeInApp: true,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: boolean = true;
  errorMessage: string = '';
  alertMessage: string = '';
  registerForm: FormGroup;
  processing: boolean = false;

  constructor(public afAuth: AngularFireAuth,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone) { }

  ngOnInit() {
    let user$ = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
      user$.unsubscribe();
    });
    this.buildForm();
    const url = this.router.url;
    this.confirmSignIn(url);
  }

  buildForm() {
    this.registerForm = this.fb.group({
      'email': '',
      'password': ''
    });
  }

  onFormSubmit(formValue) {
    if (this.login) {
      this.loginWithEmail(formValue);
    } else {
      this.registerUser(formValue);
    }
  }

  registerUser(formValue) {
    this.processing = true;
    this.afAuth.auth.createUserWithEmailAndPassword(formValue.email, formValue.password).then(response => {
      this.processing = false;
      this.router.navigate(['/dashboard']);
    }, err => {
      this.processing = false;
      this.errorMessage = err.message;
      this.alertMessage = "";
    })
  }

  loginWithEmail(formValue) {
    this.processing = true;    
    this.afAuth.auth.signInWithEmailAndPassword(formValue.email, formValue.password).then(response => {
      this.processing = false;
      this.router.navigate(['/dashboard']);
    }, err => {
      this.processing = false;
      this.errorMessage = err.message;
      this.alertMessage = "";
    })
  }

  loginWithGoogle() {
    this.processing = true;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
      this.processing = false;
      this.zone.run(() => {
        this.router.navigate(['dashboard'])
      });
    }, err => {
      this.processing = false;
      this.errorMessage = err.message;
      this.alertMessage = "";
    });
  }

  toggleLoginMode() {
    this.login = !this.login;
    this.errorMessage = "";
    this.alertMessage = "";
    this.processing = false;
  }

  async sendEmailLink() {
    this.processing = true;
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(this.registerForm.value.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', this.registerForm.value.email);
      this.alertMessage = "We have sent you an email with login link.";
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async confirmSignIn(url) {
    this.processing = true;
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
        this.alertMessage = "You will be redirected on successful verification.";
        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        if (result) {
          this.router.navigate(['/dashboard']);
        }
        window.localStorage.removeItem('emailForSignIn');
      } else {
        this.processing = false;        
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

}
