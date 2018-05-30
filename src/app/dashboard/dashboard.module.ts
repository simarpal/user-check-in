
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { HealthyChecklistComponent } from '../healthy-checklist/healthy-checklist.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [DashboardComponent, HealthyChecklistComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
