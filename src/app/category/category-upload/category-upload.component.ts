import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-category-upload',
  templateUrl: './category-upload.component.html',
  styleUrls: ['./category-upload.component.scss']
})
export class CategoryUploadComponent implements OnInit {
  public categoryArray: Array<any> = [];
  public newCategory: any = {};
  public add = false;
  id: String;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fillCategoryArray()
  }

  fillCategoryArray() {
    debugger;
    for (let category of this.categoryService.records) {
      var newCategory = {};
      newCategory["category"] = category.category;
      newCategory["costCode"] = category.costCode;
      newCategory["budget"] = Number(category.budget);
      this.categoryArray.push(newCategory);
    }
  }

  onAddCategories() {
    this.categoryService.uploadCategories(this.categoryArray, this.id).subscribe((response: any) => {
      this.router.navigate(['/projects', this.id]);
      });
  };

  addCategory() {
    if (this.newCategory.category && this.newCategory.costCode && this.newCategory.budget ) {
      console.log(this.categoryArray)
      if (this.categoryArray[0] == {}) {
        this.categoryArray.pop()
      }
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
