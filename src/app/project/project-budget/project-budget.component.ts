import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { ProjectService } from '../project.service';
import { CastExpr } from '@angular/compiler';


@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit {
  id: string;
  budgetData = [];


  displayedColumns: string[] = ['category', 'budget', 'draw1', 'draw2', 'spent', 'over/under'];
  dataSource = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, public projectService: ProjectService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.budgetData = this.formatData()
    console.log(this.budgetData)



  }

  getDraws() {
    if (this.id != undefined) {
      const json = require("/Users/tannerholle/Construction/easy-draw/src/app/models/projectTests.json");
      const projects = json.projects;
      const invoices = projects.filter(obj => {
        return obj.projectId === this.id;
      });
      return invoices[0].draws;
    };
  }

  getCategories() {
    if (this.id != undefined) {
      const json = require("/Users/tannerholle/Construction/easy-draw/src/app/models/projectTests.json");
      const project = json.projects.filter(obj => {
        return obj.projectId === this.id;
      });
      return project[0].categories;
    };

  }

  formatData() {
    var budgetArray = []
    var projectCategories = this.getCategories()
    var projectDraws = this.getDraws()
    for (var c of projectCategories) {
      var categoryInfo = {}
      categoryInfo["category"] = c.category;
      categoryInfo["budget"] = c.budget;
      categoryInfo["spent"] = 0;
      for (var draws of projectDraws) {
        if (!categoryInfo.hasOwnProperty(draws.name)) {
          categoryInfo[draws.name] = 0;
        }
        for (var d of draws.invoices) {

          if (d.category == c.category) {
            categoryInfo[draws.name] = categoryInfo[draws.name] + d.invoiceAmt;
            categoryInfo["spent"] = categoryInfo["spent"] + d.invoiceAmt;

          }
        }
      }

      categoryInfo["status"] = categoryInfo["budget"] - categoryInfo["spent"];



      budgetArray.push(categoryInfo);



    }
    return budgetArray;




  }

}
