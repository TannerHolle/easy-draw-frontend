import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Subscription } from 'rxjs';
import { Project } from '../project.model'
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

  displayedColumns: string[] = ['name', 'address', 'homeOwners', 'budget', 'phone', 'email', 'dive'];
  dataSource = [];

  ngOnInit() {
    this.projectService.getProjects();
    this.projectsSub = this.projectService.getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
    });
    // setTimeout(() => this.dataSource = this.projectService.projects);
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe()
  }

  createInvoice() {
    this.createProj = true;
  }


  showBudget(row) {
    this.projectComponent.projectId = row.id;
    console.log(this.projectComponent.projectId)
    this.projectComponent.projectBudget = true;
  }

  cellClicked(element) {
    this.projectComponent.projectId = element.id;
    console.log(element.id);
  }

}
