import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';

import { Project } from '../models/project.model';

@Injectable({providedIn: 'root'})
export class ProjectService {
  public projects: Project[] = [];
  public categories: {} = [];
  public records: any[] = [];

  private projectsUpdated = new Subject<Project[]>();

  constructor(private webReqService: WebRequestService) {}

  createProject(name: string, address: string, client: string, phone: string, email: string, budget: number, categoryArray: any[]) {
    return this.webReqService.post('projects', {
      "name": name,
      "address": address,
      "client": client,
      "phone": phone,
      "email": email,
      "budget": budget,
      "categories": categoryArray,
      "draws": [
        {
          "name": "draw1",
          "isOpen": true,
          "invoices": []
        }
      ]
    });
  }

  updateProject(id: string, name: string, address: string, client: string, phone: string, email: string, budget: number, categoryArray: any[]) {
    return this.webReqService.post(`projects/${id}`, {
      "name": name,
      "address": address,
      "client": client,
      "phone": phone,
      "email": email,
      "budget": budget,
      "categories": categoryArray,
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

  createInvoice(project: {}, company: String, address: String, category: String, invoiceNum: String, invoiceAmt: Number, draw: String) {
    return this.webReqService.post('invoices', {
      "company": company,
      "address": address,
      "category": category,
      "invoiceNum": invoiceNum,
      "invoiceAmt": invoiceAmt,
      "project": project,
      "draw": draw
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

  addCategory(category: String, costCode: String, budget: Number, id: String){
    return this.webReqService.post('categories', {
      "costCode": costCode,
      "category": category,
      "budget": budget,
      "projectId": id
    });
  }

  uploadCategories(categoryArray: Array<any> = [], id: String){
    debugger;
    return this.webReqService.post(`category-upload/${id}`, categoryArray);
  }

  closeDraw(projectId, drawId) {
    return this.webReqService.post(`close-draw/${projectId}/${drawId}`, {});
  }

  openNewDraw(projectId, drawId) {
    return this.webReqService.post(`open-new-draw/${projectId}/${drawId}`, {});
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }


}


