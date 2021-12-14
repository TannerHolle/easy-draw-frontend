import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model'
import { ProjectComponent } from '../project.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  constructor(public projectService: ProjectService, private router: Router, public projectComponent: ProjectComponent) { }

  createProj: Boolean = false;
  projects: Project[] = [];
  private projectsSub: Subscription;

  displayedColumns: string[] = ['name', 'client', 'budget', '_id'];
  dataSource = [];

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;
      this.projectService.projects = projects;
    });


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
  }

  deleteProject(projectId){
    var result = confirm("Are you sure you want to delete this project? THIS CANNOT BE UNDONE");
    if (result) {
      this.projectService.deleteProject(projectId).subscribe((res: any) => {
        window.location.reload();
        // this.router.navigate(['']);
      });
    }
  }

}
