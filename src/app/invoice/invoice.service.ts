import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Invoice } from '../models/invoice.model';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  private invoices: Invoice[] = [];
  private invoicesUpdated = new Subject<Invoice[]>();

  constructor(private http: HttpClient) {}

  getInvoices() {
    this.http
    .get<{ message: string, invoices: Invoice[] }>(
      "http://localhost:3000/api/invoices"
      )
      .subscribe((inoviceData) => {
        this.invoices = inoviceData.invoices;
        this.invoicesUpdated.next([...this.invoices]);
      });
  }

  getInvoiceUpdateListener() {
    return this.invoicesUpdated.asObservable();
  }

  addInvoices(company: String, address: String, project: String, category: String, invoiceNum: String, invoiceAmt: Number) {
    const invoice: Invoice = {company: company, address: address, category: category, invoiceNum: invoiceNum, invoiceAmt: invoiceAmt};
    this.http.post<{message: string}>("http://localhost:3000/api/invoices", invoice)
      .subscribe((responseData) => {
        // console.log(responseData);
        this.invoices.push(invoice);
        this.invoicesUpdated.next([...this.invoices]);
      })

  }

}
