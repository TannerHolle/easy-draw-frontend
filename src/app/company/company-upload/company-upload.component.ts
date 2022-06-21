import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-upload',
  templateUrl: './company-upload.component.html',
  styleUrls: ['./company-upload.component.scss']
})
export class CompanyUploadComponent implements OnInit {
  public vendorArray: Array<any> = [];
  public newVendor: any = {};
  public add = false;
  id: String;
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.fillVendorArray();
  }

  fillVendorArray() {
    for (let vendor of this.companyService.records) {
      var newVendor = {};
      newVendor["name"] = vendor.Name;
      newVendor["address"] = vendor.Address;
      newVendor["email"] = vendor.Email;
      newVendor["phone"] = vendor.Phone;
      newVendor["taxId"] = vendor.Taxid;
      newVendor["certOfInsurance"] = "";
      newVendor["notes"] = "";
      this.vendorArray.push(newVendor);
    }
  }

  addVendor() {
    if (this.newVendor.Name && this.newVendor.Address && this.newVendor.Email ) {
      if (this.vendorArray[0] == {}) {
        this.vendorArray.pop()
      }
      this.vendorArray.push(this.newVendor)
      this.newVendor = {};
    } else if (this.add == false) {
      this.add = true;
    } else {
      alert("You must enter Category, Cost Code, and Budget")
    }
  }

  onAddVendors() {
    debugger;
    this.companyService.uploadCompanies(this.vendorArray, this.id).subscribe((response: any) => {
      this.router.navigate(['/companies']);
      });
  };

  addCategoryOnSave() {
    if (this.newVendor.Name && this.newVendor.Address && this.newVendor.Email ) {
      this.vendorArray.push(this.newVendor)
      this.newVendor = {};
    }
  }

  deleteVendor(index) {
    this.vendorArray.splice(index, 1);
  }

}
