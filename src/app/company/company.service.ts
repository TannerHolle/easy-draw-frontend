import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Company } from './company.model';
import { WebRequestService } from '../services/web-request.service';
import { Router } from '@angular/router';
import { debug } from 'console';

@Injectable({providedIn: 'root'})
export class CompanyService {
  public companies: Company[] = [];
  private companiesUpdated = new Subject<Company[]>();
  public fileName: string;
  public categories: {} = [];
  public records: any[] = [];
  public vendorArray: any[] = [];

  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;

  constructor(private http: HttpClient, private webReqService: WebRequestService, private router: Router) {}

  createCompany(name: string, address: string, email: string, phone: string, taxId: string, notes: string) {
    return this.webReqService.post('company/create', {
      "name": name,
      "address": address,
      "email": email,
      "phone": phone,
      "taxId": taxId,
      "certOfInsurance": 'PlaceHolderForNow',
      "notes": notes
    });
  }

  uploadCompanies(vendorArray: Array<any> = [], id: String){
    return this.webReqService.post(`company/upload`, vendorArray);
  }

  getCompanies() {
    return this.webReqService.get('company/list');
  }

  getCompaniesForUser(creatorId) {
    return this.webReqService.get(`company/list/${creatorId}`);
  }

  deleteCompany(companyId) {
    return this.webReqService.delete(`company/delete/${companyId}`)
  }

  getCompanyUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  uploadCategories(categoryArray: Array<any> = [], id: String){
    return this.webReqService.post(`category/upload/${id}`, categoryArray);
  }

  upload() {
    console.log(this.records)
    if (this.records.length > 0) {
      this.fileName= "";
      this.router.navigate(['/companies/upload']);
    } else {
      alert("you must add a file to upload")
    }

  }

  fillVendorArray() {
    for (let category of this.records) {
      var newCategory = {};
      newCategory["category"] = category.category;
      newCategory["costCode"] = category.costCode;
      newCategory["budget"] = Number(category.budget);
      this.vendorArray.push(newCategory);
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

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
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

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (csvRecordsArray[i]).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if (currentRecord.length == headerLength) {
        let csvRecord= {};
        csvRecord["Name"] = currentRecord[0].trim().replace(/["]+/g, '');
        csvRecord["Address"] = currentRecord[1].trim().replace(/["]+/g, '');
        csvRecord["Email"] = currentRecord[2].trim().replace(/["]+/g, '');
        csvRecord["Phone"] = currentRecord[3].trim().replace(/["]+/g, '');
        csvRecord["Taxid"] = currentRecord[4].trim().replace(/["]+/g, '');
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
