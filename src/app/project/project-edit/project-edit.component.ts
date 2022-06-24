import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  id: string;
  project = [];
  public updatedProject: any = {};
  public categoryArray: Array<any> = [];
  public newCategory: any = {};
  public add = false;

  constructor(private route: ActivatedRoute, public projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
      this.project = project;
      this.categoryArray = project[0].categories
    });
  }

  onUpdateProject(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    for (let category of this.categoryArray) {
      category["budget"] = Number(category["budget"])
    }
    this.projectService.updateProject(this.id, form.value.name, form.value.address, form.value.client, form.value.phone, form.value.email, form.value.budget, this.categoryArray).subscribe((response: any) => {
      this.router.navigate(['/projects']);
      console.log(response);
    });
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
