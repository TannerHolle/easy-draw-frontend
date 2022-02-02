import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from '../../models/project.model'
import { ProjectComponent } from '../project.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  constructor(public projectService: ProjectService, private router: Router, public projectComponent: ProjectComponent, private authService: AuthService) { }

  createProj: Boolean = false;
  projects = [];
  formattedData = [];
  private projectsSub: Subscription;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  managementOptions = ['Projects', 'Companies']
  userId: string;

  displayedColumns: string[] = ['name', 'client', 'budget', 'spent', 'status', '_id'];
  dataSource = [];

  ngOnInit() {
    this.userId = this.authService.getUserID()
    this.projectService.getProjectsForUser(this.userId).subscribe((projects: any[]) => {
      this.projects = projects;
      console.log(this.projects)
      this.formattedData = this.formatProjectDashboard(this.projects);
      this.projectService.projects = projects;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserID()
      });
  }

  //   this.projectsSub = this.projectService.getProjectUpdateListener()
  //     .subscribe((projects: Project[]) => {
  //       this.projects = projects;
  //   });
  // }

  // ngOnDestroy() {
  //   this.projectsSub.unsubscribe()
  // }

  formatProjectDashboard(projects) {
    var formattedProjects = [];
    for (let project of projects){
      if(project.creator != this.userId) {
        continue;
      }
      let projectSpent = 0;
      var projectObj = {};
      projectObj["_id"] = project._id
      projectObj["name"] = project.name
      projectObj["client"] = project.client
      projectObj["budget"] = project.budget
      for (let draw of project.draws) {
        for ( let invoice of draw.invoices) {
          projectSpent = projectSpent + invoice.invoiceAmt;
        }
      }
      projectObj["spent"] = projectSpent;
      projectObj["status"] = project.budget - projectSpent;
      formattedProjects.push(projectObj)
    }
    return formattedProjects
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
      });
    }
  }

}
