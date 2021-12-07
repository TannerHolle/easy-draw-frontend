import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../company.model'
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {


  companies: Company[] = [];
  private companiesSub: Subscription;

  constructor(public companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies: any[]) => {
      this.companies = companies;
      this.companyService.companies = companies;
    });
    this.companiesSub = this.companyService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe()
  }

  deleteCompany(companyID){
    this.companyService.deleteCompany(companyID).subscribe((res: any) => {
      window.location.reload();
    });
  }

}
