import { Component, DebugElement, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  public categoryArray: Array<any> = [];
  public newCategory: any = {};
  public add = false;

  constructor(public projectService: ProjectService, private router: Router) { }
  ngOnInit() {
  }

  onAddProject(form: NgForm) {
    console.log(this.categoryArray);
    if (form.invalid) {
      return;
    }
    this.projectService.createProject(form.value.name, form.value.address, form.value.homeOwners, form.value.phone, form.value.email, form.value.budget, this.categoryArray).subscribe((response: any) => {
      this.router.navigate(['']);
      console.log(response);
    });
    form.resetForm();
  };

  addCategory() {
    if (this.newCategory.category && this.newCategory.costCode && this.newCategory.budget ) {
      this.categoryArray.push(this.newCategory)
      this.newCategory = {};
    } else if (this.add == false) {
      this.add = true;
    } else {
      alert("You must enter Category, Cost Code, and Budget")
    }
  }

  addCategoryOnSave() {
    if (this.newCategory.category && this.newCategory.costCode && this.newCategory.budget ) {
      this.categoryArray.push(this.newCategory)
      this.newCategory = {};
    }
  }

  deleteCategory(index) {
    this.categoryArray.splice(index, 1);
  }
}
