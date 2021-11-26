import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ProjectComponent } from '../project.component';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  @Output() projectCreated = new EventEmitter;

  constructor(public projectService: ProjectService, public projectComponent: ProjectComponent) { }
  ngOnInit() {
  }

  onAddProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectService.createProject(form.value.name, form.value.address, form.value.homeOwners, form.value.phone, form.value.email, form.value.budget).subscribe((response: any) => {
      console.log(response);
    });
    form.resetForm();
    this.projectComponent.createProj = false;
  };
}
