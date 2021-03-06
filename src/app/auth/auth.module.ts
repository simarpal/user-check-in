import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,    
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent],
  providers: [AuthService]
})
export class AuthModule { }
