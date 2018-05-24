import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in.component';
import { CheckInService } from './check-in.service';

const routes: Routes = [
  { path: 'check-in', component: CheckInComponent }
];

@NgModule({
  imports: [
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [CheckInComponent],
  providers: [CheckInService]
})
export class CheckInModule { }
