import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceService } from '../../invoice/invoice.service';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';
import { mimeType } from './mime-type.validator';
import { debug } from 'console';
import { DomSanitizer } from '@angular/platform-browser';
import { Company } from 'src/app/company/company.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyDialogComponent } from 'src/app/dialogs/create-company-dialog/create-company-dialog.component';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateProjectDialogComponent } from 'src/app/dialogs/create-project-dialog/create-project-dialog.component';
import { DrawNameDialogComponent } from '../project-detail/draw-name-dialog/draw-name-dialog.component';
import { CategoryDialogComponent } from 'src/app/category/category-dialog/category-dialog.component';
import { WarningDialogComponent } from 'src/app/dialogs/warning-dialog/warning-dialog.component';


@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss']
})
export class ProjectInvoicesComponent implements OnInit {
  public companies = []
  public projects = [];
  public draws = []
  public categories = []
  selectedCompanies;
  selectedProject;
  selectedProjectId = '';
  fileName = '';
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  isSavePressed: boolean = false;

  protected _onDestroy = new Subject();
  //projects
  public projectsFilterCtrl: FormControl = new FormControl();
  public filteredProjects = new ReplaySubject(1);
  //draws 
  public drawsFilterCtrl: FormControl = new FormControl();
  public filteredDraws = new ReplaySubject(1);
  //companies 
  public companiesFilterCtrl: FormControl = new FormControl();
  public filteredCompanies = new ReplaySubject(1);
  //categories
  public categoriesFilterCtrl: FormControl = new FormControl();
  public filteredCategories = new ReplaySubject(1);

  constructor(private dialog: MatDialog, public invoiceService: InvoiceService, private authService: AuthService, private router: Router, public projectService: ProjectService, public companyService: CompanyService, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    this.companies = [{ name: 'Create New Company', _id: '123' }];
    this.projects = [{ name: 'Create New Project', _id: '123' }];

    this.form = new FormGroup({
      company: new FormControl(null, { validators: [Validators.required] }),
      draw: new FormControl(null, { validators: [Validators.required] }),
      invoiceNum: new FormControl(null, { validators: [Validators.required] }),
      invoiceAmt: new FormControl(null, { validators: [Validators.required] }),
      projectId: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      changeOrder: new FormControl(null),
      image: new FormControl(null, { validators: [Validators.required] })
    });
    var projectID = this.route.snapshot.paramMap.get('id')
    if (projectID) {
      this.form.get('projectId').setValue(projectID);
      var drawId = this.route.snapshot.paramMap.get('drawId')
      if (drawId) {
        this.form.get('draw').setValue(drawId);
      }
      this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
        this.assignProjectValue(projects);
        this.getDrawsAndCategories(projectID);
      });
    } else {
      this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
        this.assignProjectValue(projects);
      });
    }

    this.getCompanies();
    this.subscribeToProjectValueChanges();
    this.initFilterControls();
  }

  assignProjectValue(projects) {
    this.projectService.projects = projects;
    Array.prototype.push.apply(projects, this.projects);
    this.projects = projects;
    this.filteredProjects.next(this.projects.slice());
  }

  subscribeToProjectValueChanges() {
    this.form.controls['projectId'].valueChanges.subscribe(newValue => {
      if (newValue == null) {
        this.selectedProjectId = undefined;
        this.selectedProject = undefined;
        this.draws = [];
        this.filteredDraws.next(this.draws.slice());
        this.categories = [];
        this.filteredCategories.next(this.categories.slice());
      }
    });
  }

  initFilterControls() {
    this.projectsFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProjects();
      });

    this.drawsFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDraws();
      });

    this.companiesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCompanies();
      });

    this.categoriesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
  }

  protected filterProjects() {
    if (!this.projects) {
      return;
    }
    let search = this.projectsFilterCtrl.value;
    if (!search) {
      this.filteredProjects.next(this.projects.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProjects.next(
      this.projects.filter(project => project.name.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterDraws() {
    if (!this.draws) {
      return;
    }
    let search = this.drawsFilterCtrl.value;
    if (!search) {
      this.filteredDraws.next(this.draws.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredDraws.next(
      this.draws.filter(draw => draw.name.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCompanies() {
    if (!this.companies) {
      return;
    }
    let search = this.companiesFilterCtrl.value;
    if (!search) {
      this.filteredCompanies.next(this.companies.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCompanies.next(
      this.companies.filter(company => company.name.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCategories() {
    if (!this.categories) {
      return;
    }
    let search = this.categoriesFilterCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCategories.next(
      this.categories.filter(category => category.category.toLowerCase().indexOf(search) > -1)
    );
  }

  invoiceNumberPut(invoiceNum) {
    let company = this.form.get('company').value;
    let isExist = false;

    if (invoiceNum && company && this.selectedProject) {
      this.selectedProject.draws.forEach(draw => {
        if (draw.changeOrders) {
          draw.changeOrders.forEach(changeOrder => {
            if (changeOrder.company == company.name && changeOrder.invoiceNum.toLowerCase() == invoiceNum.toLowerCase()) {
              isExist = true;
            }
          })
        }
        if (draw.invoices) {
          draw.invoices.forEach(invoice => {
            if (invoice.company == company.name && invoice.invoiceNum.toLowerCase() == invoiceNum.toLowerCase()) {
              isExist = true;
            }
          })
        }
      });
    }
    if (isExist) {
      this.openWarningDialog(`Invoice Number: '${invoiceNum}' from ${company.name} already exists on ${this.selectedProject.name}. Review past invoices and if this is expected, proceed.`);
    }
  }

  openWarningDialog(message) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data: { message },
    });
  }

  openCreateCompanyDialog() {
    const dialogRef = this.dialog.open(CreateCompanyDialogComponent);
    dialogRef.afterClosed().subscribe((company: any) => {
      if (company) {
        let createCompanyOption = this.companies.pop();
        this.companies = [...this.companies, company, createCompanyOption];
        this.selectedCompanies = this.companies;
        this.filteredCompanies.next(this.companies.slice());
        this.form.patchValue({ company })
      } else {
        this.form.patchValue({ company: null })
      }
    });
  }

  openCreateProjectDialog() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);
    dialogRef.afterClosed().subscribe((project: any) => {
      if (project) {
        let createProjectOption = this.projects.pop();
        this.projects = [...this.projects, project, createProjectOption];
        this.filteredProjects.next(this.projects.slice());
        this.form.get('projectId').setValue(project._id);
        this.getDrawsAndCategories(project._id);
      } else {
        this.form.get('projectId').setValue(null);
      }
    });
  }

  openCreateDrawDialog() {
    let drawName: string;
    const dialogRef = this.dialog.open(DrawNameDialogComponent, {
      width: '255px',
      data: { drawName: drawName },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.openNewDraw(this.selectedProjectId, result).subscribe((res: any) => {
          let draw = { name: result, isOpen: true, invoices: [], changeOrders: [] };
          let createDrawOption = this.draws.pop();
          this.draws = [...this.draws, draw, createDrawOption];
          this.filteredDraws.next(this.draws.slice());
          this.form.get('draw').setValue(draw.name);
        });
      } else {
        this.form.get('draw').setValue(null);
      }
    });
  }

  openCreateCategoryDialog() {
    let category: string;
    let costCode: string;
    let budget: string;
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '255px',
      data: { category: category, costCode: costCode, budget: budget },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.addCategory(result.category, result.costCode, result.budget, this.selectedProjectId).subscribe((response: any) => {
          let category = { category: result.category, costCode: result.costCode, budget: result.budget };
          let createCategoryOption = this.categories.pop();
          this.categories = [...this.categories, category, createCategoryOption];
          this.filteredCategories.next(this.categories.slice());
          this.form.get('category').setValue(category.category);
        });
      } else {
        this.form.get('category').setValue(null);
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.domSanitizer.bypassSecurityTrustUrl(reader.result as string)
    };
    reader.readAsDataURL(file);
  }

  onAddInvoice(isReturn?: boolean) {
    this.isSavePressed = true;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (!this.form.value.changeOrder) {
      this.projectService.createInvoice(this.form.value.projectId, this.form.value.company, this.form.value.category, this.form.value.invoiceNum, this.form.value.invoiceAmt, this.form.value.draw, this.form.value.image).then(res => {
        this.isLoading = false;
        if (isReturn) {
          this.router.navigate(['/projects', this.form.value.projectId]);
        } else {
          this.resetComponentState();
        }
      })
    } else {
      this.projectService.createChangeOrder(this.form.value.projectId, this.form.value.company, this.form.value.category, this.form.value.invoiceNum, this.form.value.invoiceAmt, this.form.value.draw, this.form.value.image).then(res => {
        this.isLoading = false;
        if (isReturn) {
          this.router.navigate(['/projects', this.form.value.projectId]);
        } else {
          this.resetComponentState();
        }
      })
    }
  };

  resetComponentState() {
    this.form.reset();
    this.fileName = '';
    this.ngOnInit();
  }

  showOptions(event) {
    console.log(event.checked);
  }

  onProjectSelect(projectId) {
    if (projectId === '123') {
      this.openCreateProjectDialog();
    } else {
      this.getDrawsAndCategories(projectId);
    }
  }

  openDrawSelect(draw) {
    if (draw._id === '123') {
      this.openCreateDrawDialog();
    }
  }

  onCategorySelect(category) {
    if (category._id == '123') {
      this.openCreateCategoryDialog();
    }
  }

  getDrawsAndCategories(projectId) {
    this.selectedProjectId = projectId;
    const project = this.projects.filter(obj => {
      return obj._id === this.form.value.projectId;
    });

    this.selectedProject = project[0];

    if (project[0]['draws'].length > 0) {
      this.draws = [{ name: 'Create New Draw', _id: '123' }];
      Array.prototype.push.apply(this.draws, project[0]['draws'])
      this.filteredDraws.next(this.draws.slice());
    }
    if (project[0]['categories'].length > 0) {
      this.categories = [{ category: 'Create New Category', _id: '123' }];
      Array.prototype.push.apply(this.categories, project[0]['categories'])
      this.filteredCategories.next(this.categories.slice());
    } else {
      this.categories = [];
    }

  }



  getCompanies() {
    this.companyService.getCompaniesForUser(this.authService.getUserID()).subscribe((companies: any[]) => {
      Array.prototype.push.apply(this.companies, companies)
      // this.companies = companies
      this.selectedCompanies = this.companies
      this.filteredCompanies.next(this.companies.slice());
    });
  }

  getOpenDraw() {
    const project = this.projects.filter(obj => {
      return obj._id === this.form.value.projectId;
    });
    const draw = project[0].draws.filter(obj => {
      return obj.isOpen === true;
    });
    return draw[0].name;
  }

  createNewCompany(id) {
    if (id === '123') {
      this.openCreateCompanyDialog();
    } else {
      this.selectedCompanies = this.companies;
    }
  }

  resetCompanies() {
    this.selectedCompanies = this.companies;
  }

  // openNewDraw(draw) {
  //   if (draw.name === 'Open New Draw') {
  //     let draws = this.getDraws();
  //     let lastDraw = draws.slice(-2)[0];
  //     this.projectService.openNewDraw(this.form.value.projectId, lastDraw.name).subscribe(() => {
  //       this.router.navigate(['projects']);
  //     });
  //   }
  // }

  // onKey(value) {
  //   this.selectedCompanies = this.search(value);
  // }

  // // Filter the states list and send back to populate the selectedStates**
  // search(value: string) {
  //   let filter = value.toLowerCase();
  //   return this.companies.filter(option => option.name.toLowerCase().match(filter));
  // }

  // getCategories() {
  //   if (this.form.value.projectId) {
  //     const project = this.projects.filter(obj => {
  //       return obj._id === this.form.value.projectId;
  //     });
  //     if (project[0]['categories'].length > 0) {
  //       return project[0]['categories'];
  //     }
  //   }
  // }

  // getDraws() {
  //   if (this.form.value.projectId) {
  //     const project = this.projects.filter(obj => {
  //       return obj._id === this.form.value.projectId;
  //     });
  //     if (project[0]['draws'].length > 0) {
  //       this.draws = project[0]['draws'];
  //       this.draws.push({ name: 'Create New Draw', _id: '123' });
  //       this.filteredDraws.next(this.draws.slice());
  //       return project[0]['draws'];
  //     }
  //   }
  // }


  public searchInput: String = '';
  public searchResult: Array<any> = [];

  fetchSeries(value: any) {
    if (value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.companies.filter((company) => {
      return company.name.toLowerCase().startsWith(value.toLowerCase());
    })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
