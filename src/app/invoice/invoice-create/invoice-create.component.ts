import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {

  constructor(public invoiceService: InvoiceService) { }
  ngOnInit() {
  }

  onAddInvoice(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.invoiceService.addInvoices(form.value.company, form.value.companyAddress, form.value.project, form.value.category, form.value.invoiceNum, form.value.invoiceAmt)
    form.resetForm();
  };


}
