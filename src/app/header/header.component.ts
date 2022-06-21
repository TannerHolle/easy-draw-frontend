import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  managementOptions = ['Projects', 'Companies']
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserID()
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  downloadBudgetTemplate() {
    const header = "costCode,category,budget"
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(header);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Budget-CategoryTemplate.csv';
    hiddenElement.click();
  }
  downloadVendorTemplate() {
    const header = "Name,Address,Email,Phone,TaxId"
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(header);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'VendorTemplate.csv';
    hiddenElement.click();
  }

}
