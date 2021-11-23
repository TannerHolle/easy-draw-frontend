import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProjectComponent } from '../project.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit, OnChanges {

  constructor(public projectService: ProjectService, public projectComponent: ProjectComponent) { }
  projectInvoices = [];

  ngOnInit() {
    this.projectInvoices = this.projectComponent.projectInvoices;
  }

  ngOnChanges() {
    console.log("lets see if anything changes");
  }


}
