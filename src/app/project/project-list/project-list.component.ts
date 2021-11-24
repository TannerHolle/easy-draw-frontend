import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { RouterModule, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model'
import { ProjectComponent } from '../project.component';
import { ProjectService } from '../project.service';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(public projectService: ProjectService, public projectComponent: ProjectComponent) { }

  createProj: Boolean = false;
  projects: Project[] = [];
  private projectsSub: Subscription;

  displayedColumns: string[] = ['name', 'address', 'homeOwners', 'budget', 'phone', 'email'];
  dataSource = [];

  ngOnInit() {
    this.projectService.getProjects();
    this.projectsSub = this.projectService.getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe()
  }

  createInvoice() {
    this.createProj = true;
  }

  cellClicked(element) {
    this.projectComponent.projectInvoices = element.inovices;
    // console.log(element.invoices);
    this.projectComponent.projectBudget = true;

  }

}
