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
  invoices: [];


  displayedColumns: string[] = ['company','category','address','amount','invoiceNum'];
  dataSource = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, public projectService: ProjectService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != undefined) {
      const json = require("/Users/tannerholle/Construction/easy-draw/src/app/models/projectTests.json");
      const projects = json.projects;
      const invoices = projects.filter(obj => {
        return obj.projectId === this.id;
      });
      this.invoices = invoices[0].invoices;
    }

    //get invoices
  }

}
