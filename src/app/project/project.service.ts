import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';


import { Project } from '../models/project.model';

@Injectable({providedIn: 'root'})
export class ProjectService {
  public projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient, private webReqService: WebRequestService) {}

  createProject(name: string, address: string, homeOwners: string, phone: string, email: string, budget: number) {
    return this.webReqService.post('projects', {
      "name": name,
      "address": address,
      "homeOwners": homeOwners,
      "phone": phone,
      "email": email,
      "budget": budget,
      "categories": [],
      "draws": []
    });
  }

  getProjects() {
    return this.webReqService.get('projects');
  };

  getOneProject(id) {
    return this.webReqService.get(`projects/${id}`);
  };

  deleteProject(projectId) {
    return this.webReqService.delete(`projects/${projectId}`)
  }







  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  // addProjects(name: String, address: String, homeOwners: String, phone: String, email: String, budget: Number) {
  //   const project: Project = { name: name, address: address, homeOwners: homeOwners, phone: phone, email: email, budget: budget, categories: [], draws: []};
  //   this.http.post<{message: string}>("http://localhost:3000/api/projects", project)
  //     .subscribe((responseData) => {
  //       // console.log(responseData);
  //       this.projects.push(project);
  //       this.projectsUpdated.next([...this.projects]);
  //     });

  // }

}


