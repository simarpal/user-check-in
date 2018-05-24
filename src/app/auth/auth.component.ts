import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AppSessionService } from './../app-session.service';
import { User } from './../types/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login: boolean = true;
  errorMessage: string = '';
  registerForm: FormGroup;
  successMessage: string = '';
  
  constructor(public afAuth: AngularFireAuth,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private appSessionService: AppSessionService) { }

  ngOnInit() {
    this.buildForm();        
    this.afAuth.user.subscribe(user => {
      if (user && user.email) {  
        this.router.navigate(['/check-in']);
      }
    });
    
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
    this.authService.registerUser(formValue)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created.";
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  loginWithEmail(formValue) {
    this.authService.loginWithEmail(formValue)
      .then(res => {
        this.appSessionService.user = new User({ email : formValue.email });
        this.router.navigate(['/check-in']);
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
      this.appSessionService.user = new User({ email: res.additionalUserInfo.profile.email });
      this.router.navigate(['/check-in']);
    });
  }

  toggleLoginMode() {
    this.login = !this.login;
  }
}
