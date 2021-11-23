import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Project } from '../models/project.model';

@Injectable({providedIn: 'root'})
export class ProjectService {
  public projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient) {}

  getProjects() {
    this.http
    .get<{ message: string, projects: Project[] }>(
      "http://localhost:3000/api/projects"
      )
      .subscribe((projectData) => {
        this.projects = projectData.projects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  addProjects(name: String, address: String, homeOwners: String, phone: String, email: String, budget: Number) {
    var newId = address.replace(/\s/g, '');
    const project: Project = {id: newId, name: name, address: address, homeOwners: homeOwners, phone: phone, email: email, budget: budget, invoices: []};
    this.http.post<{message: string}>("http://localhost:3000/api/projects", project)
      .subscribe((responseData) => {
        console.log(responseData);
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
      });
    console.log(this.projects);

  }
}


