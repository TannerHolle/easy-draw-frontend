import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvoiceService } from '../../invoice/invoice.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss']
})
export class ProjectInvoicesComponent implements OnInit {

  selectedValue: {};

  categories = ["Plumbing", "Framing", "Concrete", "Interior", "Smoothing"]

  constructor(public invoiceService: InvoiceService, public projectService: ProjectService) { }
  ngOnInit() {
  }

  onAddInvoice(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectService.createInvoice(form.value.project, form.value.company, form.value.address, form.value.category, form.value.invoiceNum, form.value.invoiceAmt)
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



}
