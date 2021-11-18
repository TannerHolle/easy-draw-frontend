import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Company } from '../company.model';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  enteredName = "";
  enteredAddress = "";
  enteredTaxId = "";
  enteredNotes = "";

  @Output() companyCreated = new EventEmitter<Company>();


  constructor() { }

  ngOnInit() {
  }

  onAddCompany(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const newCompany: Company = {
      Name: form.value.Name,
      Address: form.value.Address,
      TaxID: form.value.TaxID,
      Notes: form.value.Notes
    };

    this.companyCreated.emit(newCompany)
  };

}
