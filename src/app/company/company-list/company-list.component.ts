import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../company.model'
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CreateCompanyDialogComponent } from 'src/app/dialogs/create-company-dialog/create-company-dialog.component';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  private companiesSub: Subscription;
  displayedColumns: string[] = ['name', 'address', 'email', 'phone', 'taxId', '_id'];
  dataSource = new MatTableDataSource<Company>();


  constructor(private dialog: MatDialog, public companyService: CompanyService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.companyService.getCompaniesForUser(this.authService.getUserID()).subscribe((companies: any[]) => {
      this.companies = companies;
      console.log(companies)
      this.companyService.companies = companies;
      this.dataSource.data = companies;
    });
    this.companiesSub = this.companyService.getCompanyUpdateListener()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
    });
  }

  openCreateCompanyDialog() {
    const dialogRef = this.dialog.open(CreateCompanyDialogComponent);
    dialogRef.afterClosed().subscribe((company: Company) => {
      if (company) {
        this.companies.push(company);
        this.dataSource.data = this.companies;
      }
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
