import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb  } from 'pdf-lib'
import { jsPDF } from 'jspdf'
import * as JSZip from 'jszip';


import { MatDialog, MatSidenav } from '@angular/material';

import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DrawNameDialogComponent } from './draw-name-dialog/draw-name-dialog.component';
import { HttpClient } from '@angular/common/http';


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
  drawChangeOrders = [];
  drawData = [];
  draws = [];
  project = [];
  name: string;
  imgUrls = []


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  displayedColumns: string[] = ['company','category','address','invoiceNum','amount', 'taxId', 'invoicePath', 'isPaid'];
  dataSource = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog, public projectService: ProjectService, private observer: BreakpointObserver, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.imgUrls = [];
      this.drawData = [];
      this.id = routeParams.id;
      this.drawId = routeParams.drawid;
      this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
        this.projectService.projects = projects;
      });
      this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
        this.project = project;
        this.drawIdCapital = this.makePretty(this.drawId);
        this.drawInvoices = this.getInvoicesOnDraw();
        if (this.drawInvoices.length > 0) {
          this.drawData.push({name: 'Invoices', data: this.drawInvoices});
        }
        this.drawChangeOrders = this.getChangeOrdersOnDraw();
        if (this.drawChangeOrders.length > 0) {
          this.drawData.push({name: 'Change Orders', data: this.drawChangeOrders});
        }
        this.draw = this.getDraw();
        this.draws = this.getDrawInfo();
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

  getChangeOrdersOnDraw() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0].changeOrders;
  }

  calculateTotal(name) {
    if (name === 'Invoices') {
      return this.drawInvoices.reduce((accum, curr) => accum + curr.invoiceAmt, 0);
    }
    if (name === 'Change Orders') {
      return this.drawChangeOrders.reduce((accum, curr) => accum + curr.invoiceAmt, 0);
    }
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

  openDialog(): void {
    let drawName: string;

    const dialogRef = this.dialog.open(DrawNameDialogComponent, {
      width: '255px',
      data: {drawName: drawName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.openNewDraw(this.id, result).subscribe((res: any) => {
          this.router.navigate(['/projects', this.id, 'draws', result]);
        });
      }
    });
  };

  changePaidStatus(isPaid, invoiceId, type) {
    this.projectService.changePaidStatus(this.id, this.drawId, invoiceId, isPaid, type).subscribe((res: any) => {
      window.location.reload();
    });
  }


}



