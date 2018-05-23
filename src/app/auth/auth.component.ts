import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(public afAuth: AngularFireAuth,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      'email': '',
      'password': ''
    });
  }

  registerUser(value) {
    this.authService.registerUser(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created.";
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }
}
