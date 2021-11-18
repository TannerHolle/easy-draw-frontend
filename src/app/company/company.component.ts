import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  enteredValue = "";
  newCompany = "";

  constructor() { }

  ngOnInit() {
  }

  onAddCompany() {
    this.newCompany = this.enteredValue;
  }

}
