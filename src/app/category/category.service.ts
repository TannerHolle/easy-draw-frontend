import { Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { WebRequestService } from '../services/web-request.service';
import { environment } from "../../environments/environment";
import {ActivatedRoute, Router} from '@angular/router';



import { Project } from '../models/project.model';


@Injectable({providedIn: 'root'})
export class CategoryService {
  public projects: Project[] = [];
  public categories: {} = [];
  public companies: {} = [];
  public records: any[] = [];
  public showUpload = false;

  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;
  public fileName: string;

  constructor(private webReqService: WebRequestService, private router: Router) {}

  addCategory(category: String, costCode: String, budget: Number, id: String){
    return this.webReqService.post('category/create', {
      "costCode": costCode,
      "category": category,
      "budget": budget,
      "projectId": id
    });
  }

  uploadCategories(categoryArray: Array<any> = [], id: String){
    return this.webReqService.post(`category/upload/${id}`, categoryArray);
  }

  upload(projectId) {
    if (this.records.length > 0) {
      this.fileName= "";
      this.router.navigate(['/project/category-upload', projectId]);
    } else {
      alert("you must add a file to upload")
    }

  }

  changeListener(files: FileList) {
    debugger;
    this.fileName = files.item(0).name
    if(files && files.length > 0  && files.item(0).name.endsWith(".csv")) {
      let file : File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
      this.showUpload = true;
    } else {
      alert("Please import valid .csv file.");
      this.csvReader.nativeElement.value = "";
      this.records = [];
      this.jsondatadisplay = '';
    }

  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

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
