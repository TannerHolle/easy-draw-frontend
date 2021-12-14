import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  constructor(public companyService: CompanyService, private router: Router) { }
  ngOnInit() {
  }

  onAddCompany(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.companyService.createCompany(form.value.name, form.value.address, form.value.email, form.value.phone, form.value.taxId, form.value.Notes).subscribe((response: any) => {
      this.router.navigate(['/companies']);
    });
    form.resetForm();
  };

}
