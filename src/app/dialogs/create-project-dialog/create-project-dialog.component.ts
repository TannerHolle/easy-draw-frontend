import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateProjectDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onProjectCreate(project) {
    this.dialogRef.close(project);
  }
}
