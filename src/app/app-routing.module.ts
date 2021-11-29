import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { InvoiceCreateComponent } from './invoice/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectBudgetComponent } from './project/project-budget/project-budget.component';
import { ProjectInvoicesComponent } from './project/project-invoices/project-invoices.component';

const routes: Routes = [
  {path: '', component: ProjectComponent},
  {path: 'invoices', children:[ {path: 'create', component: InvoiceCreateComponent}]},
  {path: 'companies', component: CompanyComponent},
  {path: 'projects', component: ProjectComponent,},
  {path: 'projects/:id', component: ProjectBudgetComponent},
  {path: 'projects/:id/draws/:drawid', component: ProjectDetailComponent},
  {path: 'project/invoices', component: ProjectInvoicesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
