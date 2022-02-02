import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { MatSidenav } from '@angular/material';

import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  id: string;
  drawId: string;
  drawIdCapital: string;
  draw = []
  drawInvoices = [];
  draws = [];
  project = [];

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  displayedColumns: string[] = ['company','category','address','invoiceNum','amount', 'taxId', 'invoicePath'];
  dataSource = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, public projectService: ProjectService, private observer: BreakpointObserver) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.id = routeParams.id;
      this.drawId = routeParams.drawid;
      this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
        this.project = project;
        this.drawIdCapital = this.makePretty(this.drawId);
        this.drawInvoices = this.getInvoicesOnDraw();
        this.draw = this.getDraw();
        this.draws = this.getDrawInfo();
        console.log(this.drawInvoices)
      });
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

  getInvoicesOnDraw() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0].invoices;
  }

  getDraw() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0];
  }

  getDrawInfo() {
    return this.project[0].draws;
  }

  makePretty(str) {
    var newStr = str.replace(/(.{4})/g, '$1 ');
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }

  download() {
    const items = this.getInvoicesOnDraw();
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = this.project[0].name + '_invoices.csv';
    hiddenElement.click();
  }


  createDraw() {
    this.projectService.openNewDraw(this.id, this.drawId).subscribe((res: any) => {
      window.location.reload();
    });
  }


}
