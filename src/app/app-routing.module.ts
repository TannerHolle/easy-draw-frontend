import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { InvoiceCreateComponent } from './invoice/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ProjectBudgetComponent } from './project/project-budget/project-budget.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'invoices', component: InvoiceComponent},
  {path: 'projects', component: ProjectComponent},
  {path: 'budget', component: ProjectBudgetComponent},
  {path: 'companies', component: CompanyListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
