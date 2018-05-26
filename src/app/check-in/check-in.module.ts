import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in.component';
import { CheckInService } from './check-in.service';

const routes: Routes = [
  { path: 'check-in', component: CheckInComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [CheckInComponent],
  providers: [CheckInService]
})
export class CheckInModule { }
