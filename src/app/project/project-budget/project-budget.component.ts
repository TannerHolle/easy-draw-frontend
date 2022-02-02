import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from '../project.service';
import { MatSidenav } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';


export class CsvData {
  public costCode: any;
  public category: any;
  public budget: any;
}

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
  spent = 100;

  columns = [];
  displayedColumns: string[] = [];
  dataSource = [];

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;
  public fileName: string;



  @ViewChild('downloadTemplate') downloadTemplate: ElementRef;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;



  constructor(private route: ActivatedRoute, public projectService: ProjectService, private observer: BreakpointObserver, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
        this.projects = projects;
      });
      this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
        this.project = project;
        this.budgetData = this.formatData(this.project);
        this.projectName = this.project[0].name;
        this.draws = this.project[0].draws;
        if(this.budgetData.length > 0) {
          this.displayedColumns = Object.keys(this.budgetData[0])
        }
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

  calculateTotal(column) {
    return this.budgetData.reduce((accum, curr) => accum + curr[column], 0);
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

  upload() {
    if (this.projectService.records.length > 0) {
      this.router.navigate(['/project/category-upload', this.id]);
    } else {
      alert("you must add a file to upload")
    }

  }

  changeListener(files: FileList) {
    this.fileName = files.item(0).name
    if(files && files.length > 0  && files.item(0).name.endsWith(".csv")) {
      let file : File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.projectService.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.csvReader.nativeElement.value = "";
      this.records = [];
      this.jsondatadisplay = '';
    }

  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    debugger;

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord= {};
        csvRecord["costCode"] = curruntRecord[0].trim().replace(/["]+/g, '');
        csvRecord["category"] = curruntRecord[1].trim().replace(/["]+/g, '');
        csvRecord["budget"] = Number(curruntRecord[2].trim());
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

}
