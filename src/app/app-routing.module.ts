import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectBudgetComponent } from './project/project-budget/project-budget.component';
import { ProjectInvoicesComponent } from './project/project-invoices/project-invoices.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { HomeComponent } from './home/home.component';
import { ProjectCategoryComponent } from './project/project-category/project-category.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CategoryUploadComponent } from './project/project-category/category-upload/category-upload.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectComponent},
  {path: 'home', component: HomeComponent},
  {path: 'companies', component: CompanyComponent},
  {path: 'project-list', component: ProjectListComponent},
  {path: 'projects/:id', component: ProjectBudgetComponent},
  {path: 'projects/:id/draws/:drawid', component: ProjectDetailComponent},
  {path: 'project/invoices', component: ProjectInvoicesComponent},
  {path: 'project/invoices/:id', component: ProjectInvoicesComponent},
  {path: 'project/create', component: ProjectCreateComponent},
  {path: 'company/create', component: CompanyCreateComponent, canActivate: [AuthGuard]},
  {path: 'company/create/:id', component: CompanyCreateComponent},
  {path: 'project/category/:id', component: ProjectCategoryComponent},
  {path: 'project/category-upload/:id', component: CategoryUploadComponent},
  {path: 'project-edit/:id', component: ProjectEditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
