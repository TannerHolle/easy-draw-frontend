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













  // getCompaniesDeprecated() {
  //   this.http
  //   .get<{ message: string, companies: Company[] }>(
  //     "http://localhost:3000/companies"
  //     )
  //     .subscribe((companyData) => {
  //       this.companies = companyData.companies;
  //       this.companiesUpdated.next([...this.companies]);
  //     });
  // }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  // addCompanies(Name: String, Address: String, TaxID: String, Notes: String) {
  //   const company: Company = {id: null, Name: Name, Address: Address, TaxID: TaxID, Notes: Notes};
  //   this.http.post<{message: string}>("http://localhost:3000/api/companies", company)
  //     .subscribe((responseData) => {
  //       console.log(responseData);
  //       this.companies.push(company);
  //       this.companiesUpdated.next([...this.companies]);
  //     })

  // }

}
