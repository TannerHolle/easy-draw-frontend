import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectBudgetComponent } from './project/project-budget/project-budget.component';
import { ProjectInvoicesComponent } from './project/project-invoices/project-invoices.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { HomeComponent } from './home/home.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CategoryUploadComponent } from './category/category-upload/category-upload.component';
// import { ProjectListComponent } from './project/project-list/project-list.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { AuthGuard } from './auth/auth.guard';
import { ProjectDashboardComponent } from './project/project-dashboard/project-dashboard.component';
import { EditInvoiceComponent } from './project/project-invoices/edit-invoice/edit-invoice.component';
import { CompanyUploadComponent } from './company/company-upload/company-upload.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'companies', component: CompanyComponent},
  // {path: 'project-list', component: ProjectListComponent},
  {path: 'projects/:id', component: ProjectBudgetComponent},
  {path: 'projects/:id/draws/:drawid', component: ProjectDetailComponent},
  {path: 'project/invoices', component: ProjectInvoicesComponent},
  {path: 'project/edit-invoice/:projectId/:drawId/:invoiceId', component: EditInvoiceComponent},
  {path: 'project/invoices/:id', component: ProjectInvoicesComponent},
  {path: 'project/invoices/:id/:drawId', component: ProjectInvoicesComponent},
  // {path: 'project/create', component: ProjectCreateComponent},
  // {path: 'company/create', component: CompanyCreateComponent, canActivate: [AuthGuard]},
  {path: 'company/create/:id', component: CompanyCreateComponent},
  // {path: 'project/category/:id', component: ProjectCategoryComponent},
  {path: 'project/category-upload/:id', component: CategoryUploadComponent},
  {path: 'companies/upload', component: CompanyUploadComponent},
  {path: 'project-edit/:id', component: ProjectEditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},

  {
    path: 'reset-password/verify',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then(mod => mod.ResetPasswordModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
