import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Company } from './company.model';
import { WebRequestService } from '../services/web-request.service';

@Injectable({providedIn: 'root'})
export class CompanyService {
  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor(private http: HttpClient, private webReqService: WebRequestService) {}

  createCompany(Name: string, Address: string, TaxID: string, Notes: string) {
    return this.webReqService.post('companies', {
      "Name": Name,
      "Address": Address,
      "TaxID": TaxID,
      "Notes": Notes
    });
  }

  getCompanies() {
    return this.webReqService.get('companies');
  }

  deleteCompany(companyId) {
    return this.webReqService.delete(`companies/${companyId}`)
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }


}
