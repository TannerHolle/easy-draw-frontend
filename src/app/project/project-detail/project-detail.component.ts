import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model'
import { ProjectComponent } from '../project.component';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  id: string;
  drawId: string;
  drawInfo = {}
  draw = [];


  displayedColumns: string[] = ['company','category','address','amount','invoiceNum','amount'];
  dataSource = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, public projectService: ProjectService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.drawId = this.route.snapshot.paramMap.get('draw');
    this.draw = this.getdraw();

  }

  getProject() {
    if (this.id != undefined) {
      const json = require("/Users/tannerholle/Construction/easy-draw/src/app/models/projectTests.json");
      const projects = json.projects;
      const project = projects.filter(obj => {
        return obj.projectId === this.id;
      });
      return project[0];
    }
  }

  getInvoicesOnDraw() {
    const project = this.getProject()
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0].invoices;
  }

  getdraw() {
    const project = this.getProject()
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0];
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
    hiddenElement.download = this.getProject().name + '_invoices.csv';
    hiddenElement.click();
  }

}
