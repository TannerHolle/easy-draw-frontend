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

const routes: Routes = [
  {path: '', component: ProjectComponent},
  {path: 'home', component: HomeComponent},
  {path: 'companies', component: CompanyComponent},
  {path: 'projects', component: ProjectComponent,},
  {path: 'projects/:id', component: ProjectBudgetComponent},
  {path: 'projects/:id/draws/:drawid', component: ProjectDetailComponent},
  {path: 'project/invoices', component: ProjectInvoicesComponent},
  {path: 'project/create', component: ProjectCreateComponent},
  {path: 'project/category/:id', component: ProjectCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
