import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.scss']
})
export class ProjectCategoryComponent implements OnInit {

  id: String;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }


  onAddCategory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectService.addCategory(form.value.category, form.value.costCode, form.value.budget,this.id).subscribe((response: any) => {
      this.router.navigate(['/projects', this.id]);
      });
  };
}
