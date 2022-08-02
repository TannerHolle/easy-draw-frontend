import { Component, DebugElement, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  @Input() isDialogOpen = false;
  @Output() onProjectCreate = new EventEmitter();
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
    this.projectService.createProject(form.value.name, form.value.draw, form.value.address, form.value.client, form.value.phone, form.value.email, form.value.budget, this.categoryArray).subscribe((response: any) => {
      if (this.isDialogOpen) {
        this.onProjectCreate.emit(JSON.parse(response));
      } else {
        this.router.navigate(['/projects']);
        console.log(response);
      }
    });
    form.resetForm();
  };

  addCategory() {
    if (this.newCategory.category && this.newCategory.costCode && this.newCategory.budget) {
      this.categoryArray.push(this.newCategory)
      this.newCategory = {};
    } else if (this.add == false) {
      this.add = true;
    } else {
      alert("You must enter Category, Cost Code, and Budget")
    }
  }

  addCategoryOnSave() {
    if (this.newCategory.category && this.newCategory.costCode && this.newCategory.budget) {
      this.categoryArray.push(this.newCategory)
      this.newCategory = {};
    }
  }

  deleteCategory(index) {
    this.categoryArray.splice(index, 1);
  }
}
