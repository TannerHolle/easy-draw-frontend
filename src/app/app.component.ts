import { Component } from '@angular/core';
import { Company } from './company/company.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedCompanies: Company[] = [];

  onCompaniesAdded(company) {
    this.storedCompanies.push(company)
  }
}
