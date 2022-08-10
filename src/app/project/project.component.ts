import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CompanyService } from '../company/company.service';
import { CreateProjectDialogComponent } from '../dialogs/create-project-dialog/create-project-dialog.component';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectInvoices = [];
  projectUpdateSubject = new Subject();

  constructor(private dialog: MatDialog, public projectService: ProjectService, public companyService: CompanyService, private authService: AuthService) { }

  ngOnInit() {
    this.companyService.getCompaniesForUser(this.authService.getUserID()).subscribe((companies: any[]) => {
      this.companyService.companies = companies;
    });
  }

  openCreateProjectDialog() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
    dialogRef.afterClosed().subscribe((project: any) => {
      if (project) {
        this.projectUpdateSubject.next(project)
      }
    });
  }

}
