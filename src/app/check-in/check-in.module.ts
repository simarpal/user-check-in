import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInComponent } from './check-in.component';
import { CheckInService } from '../check-in.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheckInComponent],
  providers: [CheckInService]
})
export class CheckInModule { }
