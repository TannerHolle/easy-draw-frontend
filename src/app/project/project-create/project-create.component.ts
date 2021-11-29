import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {


  constructor(public projectService: ProjectService, private router: Router) { }
  ngOnInit() {
  }

  onAddProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectService.createProject(form.value.name, form.value.address, form.value.homeOwners, form.value.phone, form.value.email, form.value.budget).subscribe((response: any) => {
      this.router.navigate(['']);
      console.log(response);
    });
    form.resetForm();
  };
}
