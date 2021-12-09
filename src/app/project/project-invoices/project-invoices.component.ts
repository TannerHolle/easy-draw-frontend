import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvoiceService } from '../../invoice/invoice.service';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss']
})
export class ProjectInvoicesComponent implements OnInit {
  public companies = []
  selectedValue: {};
  selectedCompany: {};
  selectedFile = null;

  constructor(public invoiceService: InvoiceService, private router: Router, public projectService: ProjectService, public companyService: CompanyService) { }
  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
    console.log(typeof(this.selectedFile));
  }

  onAddInvoice(form: NgForm) {
    if (form.invalid) {
      return;
    }
    var draw = this.getOpenDraw()
    this.projectService.createInvoice(form.value.project, form.value.company, form.value.address, form.value.category, form.value.invoiceNum, form.value.invoiceAmt, draw, this.selectedFile).subscribe((response: any) => {
      this.router.navigate(['']);
      console.log(response);
    });
    form.resetForm();
  };

  getCategories() {
    if (this.selectedValue) {
      const project = this.projectService.projects.filter(obj => {
        return obj._id === this.selectedValue['_id'];
      });
      if(project[0]['categories'].length > 0) {
        return project[0]['categories'];
      }
    }
  }

  getOpenDraw() {
    const project = this.projectService.projects.filter(obj => {
      return obj._id === this.selectedValue['_id'];
    });
    const draw = project[0].draws.filter(obj => {
      return obj.isOpen === true;
    });
    return draw[0].name;
  }



}
