import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
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

  constructor(public projectService: ProjectService) { }

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
}
