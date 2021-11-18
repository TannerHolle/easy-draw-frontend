import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easy-draw';
  storedCompanies = [];

  onCompaniesAdded(company) {
    this.storedCompanies.push(company)
  }
}
