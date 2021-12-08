import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { ProjectService } from '../project.service';
import { MatSidenav } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';



@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit, AfterViewInit {
  id: string;
  budgetData = [];
  projectName = '';
  project = [];
  projects = [];
  draws = [];

  columns = [];
  displayedColumns: string[] = [];
  dataSource = [];

  @ViewChild('downloadTemplate') downloadTemplate: ElementRef;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  constructor(private route: ActivatedRoute, private http: HttpClient, public projectService: ProjectService, private observer: BreakpointObserver) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.projectService.getProjects().subscribe((projects: any[]) => {
        this.projects = projects;
      });
      this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
        this.project = project;
        this.budgetData = this.formatData(this.project);
        this.projectName = this.project[0].name;
        this.draws = this.project[0].draws;
        this.displayedColumns = Object.keys(this.budgetData[0])
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

  makePretty(str) {
    var newStr = str.replace(/(.{4})/g, '$1 ');
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }

}
