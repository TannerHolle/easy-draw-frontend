import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from '../company.service';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  constructor(public companyService: CompanyService) { }
  ngOnInit() {
  }

  onAddCompany(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.companyService.createCompany(form.value.Name, form.value.Address, form.value.TaxID, form.value.Notes).subscribe((response: any) => {
      window.location.reload();
    });
    form.resetForm();
  };

}
