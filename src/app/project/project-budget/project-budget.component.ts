import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { ProjectService } from '../project.service';
import { CastExpr } from '@angular/compiler';
import { setupMaster } from 'cluster';
import { Project } from '../../models/project.model'
import { containsElement } from '@angular/animations/browser/src/render/shared';



@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit {
  id: string;
  budgetData = [];
  projectName = '';
  project = [];

  columns = [];
  displayedColumns: string[] = [];
  dataSource = [];

  @ViewChild('downloadTemplate') downloadTemplate: ElementRef;


  constructor(private route: ActivatedRoute, private http: HttpClient, public projectService: ProjectService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
      this.project = project;
      this.budgetData = this.formatData(this.project);
      this.projectName = this.project[0].name;
      this.displayedColumns = Object.keys(this.budgetData[0])
    });

  }

  formatData(project) {
    var budgetArray = []
    var projectCategories = project[0].categories;
    var projectDraws = project[0].draws;
    for (var c of projectCategories) {
      var categoryInfo = {}
      categoryInfo["costCode"] = c.costCode;
      categoryInfo["category"] = c.category;
      categoryInfo["budget"] = c.budget;
      var spend = 0;
      for (var draws of projectDraws) {
        if (!categoryInfo.hasOwnProperty(draws.name)) {
          categoryInfo[draws.name] = 0;
        }
        for (var d of draws.invoices) {
          if (d.category == c.category) {
            categoryInfo[draws.name] = categoryInfo[draws.name] + d.invoiceAmt;
            spend = spend + d.invoiceAmt;
          }
        }
      }

      categoryInfo["spent"] = spend;
      categoryInfo["status"] = categoryInfo["budget"] - categoryInfo["spent"];
      budgetArray.push(categoryInfo);
    }
    return budgetArray;
  }

  download() {
    const items = this.budgetData
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = this.project[0].name + '_budget.csv';
    hiddenElement.click();
  }

}
