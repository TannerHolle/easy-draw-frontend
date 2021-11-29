import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';


import { Project } from '../models/project.model';
import { Invoice } from '../models/invoice.model';

@Injectable({providedIn: 'root'})
export class ProjectService {
  public projects: Project[] = [];
  public categories: {} = [];
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
      "categories": [
        {
          "costCode": 1,
          "category": "default",
          "budget": 0
        }
      ],
      "draws": [
        {
          "name": "draw1",
          "isOpen": true,
          "invoices": []
        }
      ]
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

  createInvoice(project: {}, company: String, address: String, category: String, invoiceNum: String, invoiceAmt: String) {
    return this.webReqService.post('invoices', {
      "company": company,
      "address": address,
      "category": category,
      "invoiceNum": invoiceNum,
      "invoiceAmt": invoiceAmt,
      "project": project
    });
  }

  getCategories(id) {
    if (id) {
      const project = this.projects.filter(obj => {
        return obj._id === id;
      });
      console.log(project[0]['categories'])
      return project[0]['categories'];
    }
  }

  addCategory(){
    return this.webReqService.post('categories', {
      "costCode": 9,
      "category": "more Testing",
      "budget": 20,
    });

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


