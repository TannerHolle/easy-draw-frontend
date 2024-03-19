import { NgForm, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project.service';
import { CompanyService } from 'src/app/company/company.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  projectId;
  drawId;
  invoiceId;
  form: UntypedFormGroup;
  project = [];
  draws;
  public updatedProject: any = {};
  public categoryArray: Array<any> = [];
  invoiceInfo = {};
  companies;
  categories;




  constructor(private projectService: ProjectService, private route: ActivatedRoute, private authService: AuthService, private companyService: CompanyService) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.drawId = this.route.snapshot.paramMap.get('drawId');
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceId');
    this.form = new UntypedFormGroup({
      company: new UntypedFormControl(null, { validators: [Validators.required] }),
      draw: new UntypedFormControl(null, { validators: [Validators.required] }),
      invoiceNum: new UntypedFormControl(null, { validators: [Validators.required] }),
      invoiceAmt: new UntypedFormControl(null, { validators: [Validators.required] }),
      category: new UntypedFormControl(null, { validators: [Validators.required] }),
      changeOrder: new UntypedFormControl(null),
      image: new UntypedFormControl(null)
    });
    this.projectService.getOneProject(this.projectId).subscribe((project: any[]) => {
      this.project = project;
      this.getInvoicesInfo();
    });
    this.form.patchValue({
      invoiceAmt: this.invoiceInfo['invoiceAmount'],
      invoiceNum: this.invoiceInfo['invoiceNumber']
    });

  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }


  onUpdateInvoice() {

    let invoiceNumb = this.form.value.invoiceNum;
    let invoiceAmnt = this.form.value.invoiceAmt;
    if (!invoiceNumb) {
      invoiceNumb = this.invoiceInfo['invoiceNumber']
    }
    if (!invoiceAmnt) {
      invoiceAmnt = this.invoiceInfo['invoiceAmount']
    }
    // if (this.form.invalid) {
    //   return;
    // }
    this.projectService.updateInvoice(this.projectId, invoiceNumb, invoiceAmnt, this.invoiceInfo['drawName'], this.invoiceId)
  };

  getInvoicesInfo() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    const invoice = draw[0].invoices.filter(obj => {
      return obj._id === this.invoiceId;
    });

    this.invoiceInfo['projectName'] = project.name
    this.invoiceInfo['drawName'] = this.drawId
    this.invoiceInfo['invoiceNumber'] = invoice[0].invoiceNum
    this.invoiceInfo['invoiceAmount'] = invoice[0].invoiceAmt
    this.invoiceInfo['company'] = invoice[0].company
    this.invoiceInfo['category'] = invoice[0].category

    // get draw info
    if(project['draws'].length > 0) {
      this.draws = project['draws'];
    }

    // get company info
    this.companyService.getCompaniesForUser(this.authService.getUserID()).subscribe((companies: any[]) => {
      Array.prototype.push.apply(companies,this.companies)
      this.companies = companies
    });

    // get category info
    if(project['categories'].length > 0) {
      this.categories = project['categories'];
    } else {
      this.categories = [];
    }
  }


}
