import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Invoice } from '../../models/invoice.model'
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  // invoices = [
  //   {name: "E Builders", address: "123 tanner st", taxid: "2541", notes: "This is the original Company"},
  //   {name: "Ivory Homes", address: "589 tyler st", taxid: "6985", notes: ""},
  //   {name: "Edge Homes", address: "96336 deschutes ave", taxid: "3652", notes: ""},
  // ];

  createInv: Boolean = false;
  invoices: Invoice[] = [];
  private invoicesSub: Subscription;

  constructor(public invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.getInvoices();
    this.invoicesSub = this.invoiceService.getInvoiceUpdateListener()
      .subscribe((invoices: Invoice[]) => {
        this.invoices = invoices;
    });
  }

  ngOnDestroy() {
    this.invoicesSub.unsubscribe()
  }

  createInvoice() {
    this.createInv = true;
  }

}
