import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  @Input() isDialogOpen = false;
  @Output() onCompanyCreate = new EventEmitter<any>();
  navigateTo;

  constructor(public companyService: CompanyService, public route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.navigateTo = this.route.snapshot.paramMap.get('id')

  }

  onAddCompany(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.companyService.createCompany(form.value.name, form.value.address, form.value.email, form.value.phone, form.value.taxId, form.value.Notes).subscribe((response: any) => {
      if(this.isDialogOpen){
        this.onCompanyCreate.emit(JSON.parse(response));
      } else if (this.navigateTo == "123") {
        this.router.navigate(['/project/invoices'])
      } else {
        this.router.navigate(['/companies']);
      }
    });
    form.resetForm();
  };

}
