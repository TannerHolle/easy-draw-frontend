import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSelectModule,
  MatTableModule,
  MatIconModule,
  MatSlideToggleModule,
  MatDialogModule
} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { InvoiceCreateComponent } from './invoice/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CompanyComponent } from './company/company.component';
import { ProjectBudgetComponent } from './project/project-budget/project-budget.component';
import { ProjectInvoicesComponent } from './project/project-invoices/project-invoices.component';
import { ProjectCategoryComponent } from './project/project-category/project-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    InvoiceCreateComponent,
    InvoiceListComponent,
    InvoiceComponent,
    HomeComponent,
    ProjectComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    CompanyComponent,
    ProjectBudgetComponent,
    ProjectInvoicesComponent,
    ProjectCategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
