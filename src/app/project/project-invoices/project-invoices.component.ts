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


@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss']
})
export class ProjectInvoicesComponent implements OnInit {
  public companies = []
  public draws = []
  public categories = []
  selectedCompanies;
  selectedProjectId = '';
  fileName = '';
  form: FormGroup;
  imagePreview: string;
  isLoading = false;




  constructor(public invoiceService: InvoiceService, private authService: AuthService, private router: Router, public projectService: ProjectService, public companyService: CompanyService, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }
  ngOnInit() {

    this.companies = [{name: 'Create New Company', _id: '123'}];
    this.form = new FormGroup({
      company: new FormControl(null, { validators: [Validators.required] }),
      draw: new FormControl(null, { validators: [Validators.required] }),
      invoiceNum: new FormControl(null, { validators: [Validators.required] }),
      invoiceAmt: new FormControl(null, { validators: [Validators.required] }),
      projectId: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      changeOrder: new FormControl(null),
      image: new FormControl(null, {validators: [Validators.required]})
    });
    var projectID = this.route.snapshot.paramMap.get('id')
    if(projectID) {
      this.form.get('projectId').setValue(projectID);
      var drawId = this.route.snapshot.paramMap.get('drawId')
      if (drawId) {
        this.form.get('draw').setValue(drawId);
      }
      this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
        this.projectService.projects = projects;
        this.getDrawsAndCategories(projectID);
      });
    }
    this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
      this.projectService.projects = projects;
      this.getDraws();
      this.getCompanies();
    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.domSanitizer.bypassSecurityTrustUrl(reader.result as string)
    };
    reader.readAsDataURL(file);
  }

  onAddInvoice() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (!this.form.value.changeOrder) {
      this.projectService.createInvoice(this.form.value.projectId, this.form.value.company, this.form.value.category, this.form.value.invoiceNum, this.form.value.invoiceAmt, this.form.value.draw, this.form.value.image)
    } else {
      this.projectService.createChangeOrder(this.form.value.projectId, this.form.value.company, this.form.value.category, this.form.value.invoiceNum, this.form.value.invoiceAmt, this.form.value.draw, this.form.value.image)
    }
  };

  showOptions(event) {
    console.log(event.checked);
}

  getDrawsAndCategories(projectId) {
    this.selectedProjectId = projectId;
    const project = this.projectService.projects.filter(obj => {
      return obj._id === this.form.value.projectId;
    });

    if(project[0]['draws'].length > 0) {
      this.draws = project[0]['draws'];
    }
    if(project[0]['categories'].length > 0) {
      this.categories = project[0]['categories'];
    } else {
      this.categories = [];
    }

  }

  getCategories() {
    if (this.form.value.projectId) {
      const project = this.projectService.projects.filter(obj => {
        return obj._id === this.form.value.projectId;
      });
      if(project[0]['categories'].length > 0) {
        return project[0]['categories'];
      }
    }
  }

  getDraws() {
    if (this.form.value.projectId) {
      const project = this.projectService.projects.filter(obj => {
        return obj._id === this.form.value.projectId;
      });
      if(project[0]['draws'].length > 0) {
        this.draws = project[0]['draws'];
        return project[0]['draws'];
      }
    }
  }


  getCompanies() {
    this.companyService.getCompaniesForUser(this.authService.getUserID()).subscribe((companies: any[]) => {
      Array.prototype.push.apply(companies,this.companies)
      this.companies = companies
      this.selectedCompanies = companies
    });
  }

  getOpenDraw() {
    const project = this.projectService.projects.filter(obj => {
      return obj._id === this.form.value.projectId;
    });
    const draw = project[0].draws.filter(obj => {
      return obj.isOpen === true;
    });
    return draw[0].name;
  }

  createNewCompany(id) {
    if (id === '123') {
      this.router.navigate(['company/create', id]);
    } else {
      this.selectedCompanies = this.companies;
    }
  }

  resetCompanies() {
    this.selectedCompanies = this.companies;
  }

  openNewDraw(draw) {
    if (draw.name === 'Open New Draw') {
      let draws = this.getDraws();
      let lastDraw = draws.slice(-2)[0];
      this.projectService.openNewDraw(this.form.value.projectId,lastDraw.name).subscribe(() => {
        this.router.navigate(['projects']);
      });
    }
  }

  // onKey(value) {
  //   this.selectedCompanies = this.search(value);
  // }

  // // Filter the states list and send back to populate the selectedStates**
  // search(value: string) {
  //   let filter = value.toLowerCase();
  //   return this.companies.filter(option => option.name.toLowerCase().match(filter));
  // }
  public searchInput:String = '';
  public searchResult: Array<any> = [];

  fetchSeries(value: any) {
    if (value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.companies.filter((company) => {
      return company.name.toLowerCase().startsWith(value.toLowerCase());
    })
  }


}
