import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../company.model'
import { CompanyService } from '../company.service';



@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  // companies = [
  //   {name: "E Builders", address: "123 tanner st", taxid: "2541", notes: "This is the original Company"},
  //   {name: "Ivory Homes", address: "589 tyler st", taxid: "6985", notes: ""},
  //   {name: "Edge Homes", address: "96336 deschutes ave", taxid: "3652", notes: ""},
  // ];

  companies: Company[] = [];
  private companiesSub: Subscription;

  constructor(public companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies: any[]) => {
      this.companies = companies;
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
    console.log(companyID);
    this.companyService.deleteCompany(companyID);
  }

}
