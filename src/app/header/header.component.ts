import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  addInvoiceRouterLink = ['/project/invoices'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserID()
      });

      this.authService.addInvoiceRouterSubject.subscribe((linkValue : any) => {
        this.addInvoiceRouterLink = linkValue;
      });
  }

  navigateToAddInvoice(){
    this.router.navigate(this.addInvoiceRouterLink);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  downloadBudgetTemplate() {
    const header = "Cost Code,Category,Budget"
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(header);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Budget-Template.csv';
    hiddenElement.click();
  }
  downloadVendorTemplate() {
    const header = "Name,Address,Email,Phone,TaxId"
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(header);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Vendor-Template.csv';
    hiddenElement.click();
  }
  downloadDrawTemplate() {
    const header = "Company,Address,Cost Code,Category,Invoice Number,Invoice Amount,TaxId"
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(header);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Draw-Template.csv';
    hiddenElement.click();
  }

}
