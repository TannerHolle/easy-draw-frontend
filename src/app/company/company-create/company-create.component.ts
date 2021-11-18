import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  enteredValue = "";
  newCompany = "";

  constructor() { }

  ngOnInit() {
  }

  onAddCompany() {
    this.newCompany = this.enteredValue;
  }

}
