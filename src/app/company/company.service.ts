import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Company } from './company.model';
import { WebRequestService } from '../services/web-request.service';

@Injectable({providedIn: 'root'})
export class CompanyService {
  public companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  constructor(private http: HttpClient, private webReqService: WebRequestService) {}

  createCompany(name: string, address: string, email: string, phone: string, taxId: string, notes: string) {
    return this.webReqService.post('companies', {
      "name": name,
      "address": address,
      "email": email,
      "phone": phone,
      "taxId": taxId,
      "certOfInsurance": 'PlaceHolderForNow',
      "notes": notes
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
