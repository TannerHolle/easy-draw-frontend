import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { InvoiceComponent } from '../invoice.component';


@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {

  constructor(public invoiceService: InvoiceService, public invoiceComponent: InvoiceComponent) { }
  ngOnInit() {
  }

  onAddInvoice(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.invoiceService.addInvoices(form.value.company, form.value.companyAddress, form.value.project, form.value.category, form.value.invoiceNum, form.value.invoiceAmt)
    form.resetForm();
    this.invoiceComponent.createInv = false;
  };


}
