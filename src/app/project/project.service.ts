import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';


import { Project } from '../models/project.model';

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

  createInvoice(project: {}, company: String, address: String, category: String, invoiceNum: String, invoiceAmt: Number) {
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


}


