import { Component, EventEmitter, Output, OnInit } from '@angular/core';

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

  onAddCompany() {
    const newCompany: Company = {
      Name: this.enteredName,
      Address: this.enteredAddress,
      TaxID: this.enteredTaxId,
      Notes: this.enteredNotes
    };

    this.companyCreated.emit(newCompany)
  };

}
