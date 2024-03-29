import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppMaterialModules } from './material.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule, MatFooterRow } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


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
// import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CompanyComponent } from './company/company.component';
import { ProjectBudgetComponent } from './project/project-budget/project-budget.component';
import { ProjectInvoicesComponent } from './project/project-invoices/project-invoices.component';
// import { ProjectCategoryComponent } from './project/project-category/project-category.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CategoryUploadComponent } from './category/category-upload/category-upload.component';
import { ProjectDashboardComponent } from './project/project-dashboard/project-dashboard.component';
import { ProjectService } from './project/project.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DrawNameDialogComponent } from './project/project-detail/draw-name-dialog/draw-name-dialog.component';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import { EditInvoiceComponent } from './project/project-invoices/edit-invoice/edit-invoice.component';
import { CompanyUploadComponent } from './company/company-upload/company-upload.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CreateCompanyDialogComponent } from './dialogs/create-company-dialog/create-company-dialog.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CreateProjectDialogComponent } from './dialogs/create-project-dialog/create-project-dialog.component';
import { WarningDialogComponent } from './dialogs/warning-dialog/warning-dialog.component';
import { DrawInvoicesUploadComponent } from './project/project-detail/draw-invoices-upload/draw-invoices-upload.component';


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
        // ProjectListComponent,
        ProjectCreateComponent,
        ProjectDetailComponent,
        CompanyComponent,
        ProjectBudgetComponent,
        ProjectInvoicesComponent,
        // ProjectCategoryComponent,
        ProjectEditComponent,
        LoginComponent,
        SignUpComponent,
        CategoryUploadComponent,
        ProjectDashboardComponent,
        DrawNameDialogComponent,
        CategoryDialogComponent,
        EditInvoiceComponent,
        CompanyUploadComponent,
        ForgotPasswordComponent,
        CreateCompanyDialogComponent,
        CreateProjectDialogComponent,
        DrawInvoicesUploadComponent,
        WarningDialogComponent
    ],
    imports: [
        AppMaterialModules,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatSelectModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatAutocompleteModule,
        NgxMatSelectSearchModule
    ],
    providers: [ProjectComponent, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
