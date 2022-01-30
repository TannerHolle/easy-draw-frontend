import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CompanyService } from '../company/company.service';
import { Project } from '../models/project.model'
import { ProjectService } from './project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projectInvoices = [];
  projects: Project[] = [];
  private projectsSub: Subscription;

  constructor(public projectService: ProjectService, public companyService: CompanyService, private authService: AuthService) { }

  ngOnInit() {
    this.projectService.getProjectsForUser(this.authService.getUserID());
    this.projectsSub = this.projectService.getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;

    });
    this.companyService.getCompanies().subscribe((companies: any[]) => {
      this.companyService.companies = companies;
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe()
  }
}
