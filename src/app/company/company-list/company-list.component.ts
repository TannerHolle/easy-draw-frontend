import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  // companies = [
  //   {name: "E Builders", address: "123 tanner st", taxid: "2541", notes: "This is the original Company"},
  //   {name: "Ivory Homes", address: "589 tyler st", taxid: "6985", notes: ""},
  //   {name: "Edge Homes", address: "96336 deschutes ave", taxid: "3652", notes: ""},
  // ];
  @Input() companies = [];

  constructor() { }

  ngOnInit() {
  }

}
