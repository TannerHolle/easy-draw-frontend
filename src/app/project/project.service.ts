import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';
import { environment } from "../../environments/environment";


import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company/company.service';

@Injectable({providedIn: 'root'})
export class ProjectService {
  public projects: Project[] = [];
  public categories: {} = [];
  public companies: {} = [];
  public records: any[] = [];

  private projectsUpdated = new Subject<Project[]>();

  constructor(private webReqService: WebRequestService, public http: HttpClient, public router: Router, public CompanyService: CompanyService) {}

  createProject(name: string, address: string, client: string, phone: string, email: string, budget: number, categoryArray: any[]) {
    return this.webReqService.post('project/create/', {
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
    return this.webReqService.post(`project/update/${id}`, {
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
    return this.webReqService.get('project/list');
  };

  getOneProject(id) {
    return this.webReqService.get(`project/${id}`);
  };

  deleteProject(projectId) {
    return this.webReqService.delete(`project/delete/${projectId}`)
  }

  createInvoice(projectId: string, company: {}, category: string, invoiceNum: string, invoiceAmt: Number, draw: string, image: File) {
    const invoiceData = new FormData()
    invoiceData.append("projectId", projectId)
    invoiceData.append("draw", draw)
    invoiceData.append("category", category)
    invoiceData.append("company", company['name'])
    invoiceData.append("address", company['address'])
    invoiceData.append("invoiceNum", invoiceNum)
    invoiceData.append("invoiceAmt", invoiceAmt.toString())
    invoiceData.append("image", image, invoiceNum)
    this.http.post(environment.apiUrl + '/invoice/create', invoiceData).subscribe(responseData => {
      console.log(responseData)
      // this.router.navigate(['']);
      this.router.navigate(['/projects', projectId]);


    });
    // return this.webReqService.post('invoices', {
    //   "company": company,
    //   "address": address,
    //   "category": category,
    //   "invoiceNum": invoiceNum,
    //   "invoiceAmt": invoiceAmt,
    //   "project": project,
    //   "draw": draw
    // });
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
    return this.webReqService.post('category/create', {
      "costCode": costCode,
      "category": category,
      "budget": budget,
      "projectId": id
    });
  }

  uploadCategories(categoryArray: Array<any> = [], id: String){
    return this.webReqService.post(`category/upload/${id}`, categoryArray);
  }

  closeDraw(projectId, drawId) {
    return this.webReqService.post(`project/close-draw/${projectId}/${drawId}`, {});
  }

  openNewDraw(projectId, drawId) {
    return this.webReqService.post(`project/open-new-draw/${projectId}/${drawId}`, {});
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }


}


