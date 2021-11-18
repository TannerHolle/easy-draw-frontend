import { Component, EventEmitter, Output, OnInit } from '@angular/core';

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

  @Output() companyCreated = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onAddCompany() {
    const newCompany = {
      Name: this.enteredName,
      Address: this.enteredAddress,
      TaxID: this.enteredTaxId,
      Notes: this.enteredNotes
    };

    this.companyCreated.emit(newCompany)
  };

}
