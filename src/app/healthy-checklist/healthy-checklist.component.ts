import { Component, OnInit, Input } from '@angular/core';

import { HealthyChecklist } from './../types/healthyChecklist';

@Component({
  selector: 'app-healthy-checklist',
  templateUrl: './healthy-checklist.component.html',
  styleUrls: ['./healthy-checklist.component.css']
})
export class HealthyChecklistComponent implements OnInit {
  @Input() healthyChecklist: HealthyChecklist = new HealthyChecklist();
  @Input() isDisabled: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
