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


@Component({
  selector: 'app-project-invoices',
  templateUrl: './project-invoices.component.html',
  styleUrls: ['./project-invoices.component.scss']
})
export class ProjectInvoicesComponent implements OnInit {
  public companies = []
  public draws = []
  selectedValue: {};
  selectedCompany: {};
  selectedFile = null;
  fileName = '';
  form: FormGroup;
  imagePreview: string;



  constructor(public invoiceService: InvoiceService, private router: Router, public projectService: ProjectService, public companyService: CompanyService, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    this.companies = [{name: 'Create New Company', _id: '123'}];
    // this.draws = [{name: 'Open New Draw', id: '123'}];
    this.form = new FormGroup({
      // company: new FormControl(null, { validators: [Validators.required] }),
      company: new FormControl(null, { validators: [Validators.required] }),
      draw: new FormControl(null, { validators: [Validators.required] }),
      invoiceNum: new FormControl(null, { validators: [Validators.required] }),
      invoiceAmt: new FormControl(null, { validators: [Validators.required] }),
      projectId: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    var projectID = this.route.snapshot.paramMap.get('id')
    this.form.get('projectId').setValue(projectID);
    this.getDraws();
    this.getCompanies();
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
    var draw = this.getOpenDraw()
    this.projectService.createInvoice(this.form.value.projectId, this.form.value.company, this.form.value.category, this.form.value.invoiceNum, this.form.value.invoiceAmt, draw, this.form.value.image)
    // .subscribe((response: any) => {
    //   this.router.navigate(['']);
    //   console.log(response);
    // });
    this.form.reset();
  };

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
    var openNewDraw = {name: 'Open New Draw', id: '123'};
    if (this.form.value.projectId) {
      const project = this.projectService.projects.filter(obj => {
        return obj._id === this.form.value.projectId;
      });
      if(project[0]['draws'].length > 0) {
        this.draws = project[0]['draws'];
        // this.draws.push(openNewDraw)
      }
    }
  }


  getCompanies() {
    this.companyService.getCompanies().subscribe((companies: any[]) => {
      Array.prototype.push.apply(companies,this.companies)
      this.companies = companies
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
    }
  }

  openNewDraw(id) {
    if (id === '123') {
      window.alert("this is where you would open a new draw")
    }
  }


}
