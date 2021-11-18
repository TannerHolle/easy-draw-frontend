import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Company } from './company.model';

@Injectable({providedIn: 'root'})

export class CompanyService {
  private companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();

  getCompanies() {
    return [...this.companies];
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  addCompanies(Name: String, Address: String, TaxID: String, Notes: String) {
    const company: Company = {Name: Name, Address: Address, TaxID: TaxID, Notes: Notes}
    this.companies.push(company);
    this.companiesUpdated.next([...this.companies]);
  }

}
