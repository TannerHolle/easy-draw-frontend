import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

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

  createProject(name: string, draw: string, address: string, client: string, phone: string, email: string, budget: number, categoryArray: any[]) {
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
          "name": draw,
          "isOpen": true,
          "invoices": [],
          "changeOrders": []
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
      "creator": null
    });
  }

  changePaidStatus(id: string, drawId: string, invoiceId: string, isPaid: boolean, type: string) {
    return this.webReqService.post(`invoice/change-paid-status`, {
      "id": id,
      "drawId": drawId,
      "invoiceId": invoiceId,
      "paidStatus": isPaid,
      "type": type
    });
  }

  getProjects() {
    return this.webReqService.get(`project/list`);
  };

  getProjectsForUser(creatorId) {
    return this.webReqService.get(`project/list/${creatorId}`);
  };

  getOneProject(id) {
    return this.webReqService.get(`project/${id}`);
  };

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  saveImages(id, drawId) {
    return this.webReqService.getImages(`project/save-images/${id}/${drawId}`);
  };

  convertImages() {
    return this.webReqService.get(`project/convert-images`);
  };

  download(filename){
    const fileObj = {
      filename : filename
    };
    console.log(fileObj);
    return this.webReqService.postImages(`project/download`, fileObj);
  }



  deleteProject(projectId) {
    return this.webReqService.delete(`project/delete/${projectId}`)
  }

  deleteInvoice(projectId, draw, invoice) {    
    return this.webReqService.post(`invoice/delete/${projectId}/${draw}`, invoice)
  }

  createInvoice(projectId: string, company: {}, category: {}, invoiceNum: string, invoiceAmt: Number, draw: string, image: File) {
    return new Promise((resolve, reject) => {
      const invoiceData = new FormData()
      invoiceData.append("projectId", projectId)
      invoiceData.append("draw", draw)
      invoiceData.append("costCode", category['costCode'])
      invoiceData.append("category", category['category'])
      invoiceData.append("company", company['name'])
      invoiceData.append("address", company['address'])
      invoiceData.append("invoiceNum", invoiceNum)
      invoiceData.append("invoiceAmt", invoiceAmt.toString())
      invoiceData.append("taxId", company['taxId'])
      invoiceData.append("image", image, invoiceNum)
      this.http.post(environment.apiUrl + '/invoice/create', invoiceData).subscribe(responseData => {
        resolve(responseData)
      });
    });
  }

  updateInvoice(projectId: string, invoiceNum: string, invoiceAmt: Number, draw: string, invoiceId: string) {
    let updateData = {
      projectId: projectId,
      invoiceNum: invoiceNum,
      invoiceAmt: invoiceAmt,
      invoiceId: invoiceId,
      draw: draw
    }
    this.http.post(environment.apiUrl + '/invoice/update', updateData).subscribe(responseData => {
      console.log(responseData)
      this.router.navigate(['/projects', projectId]);
    });
  }

  createChangeOrder(projectId: string, company: {}, category: string, invoiceNum: string, invoiceAmt: Number, draw: string, image: File) {
    return new Promise((resolve, reject) => {
      const changeOrderData = new FormData()
      changeOrderData.append("projectId", projectId)
      changeOrderData.append("draw", draw)
      changeOrderData.append("costCode", category['costCode'])
      changeOrderData.append("category", category['category'])
      changeOrderData.append("company", company['name'])
      changeOrderData.append("address", company['address'])
      changeOrderData.append("taxId", company['taxId'])
      changeOrderData.append("invoiceNum", invoiceNum)
      changeOrderData.append("invoiceAmt", invoiceAmt.toString())
      changeOrderData.append("image", image, invoiceNum)
      this.http.post(environment.apiUrl + '/invoice/create-change-order', changeOrderData).subscribe(responseData => {
        resolve(responseData);
      });
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

  uploadInvoicesOnDraw(projectId, draw, invoicesArray: Array<any> = []){
    debugger;
    return this.webReqService.post(`invoice/upload/${projectId}/${draw}`, invoicesArray);
  }

  closeDraw(projectId, drawId) {
    return this.webReqService.post(`project/close-draw/${projectId}/${drawId}`, {});
  }

  openNewDraw(projectId, drawId) {
    return this.webReqService.post(`project/open-new-draw/${projectId}`, {"drawId": drawId});
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }


}


