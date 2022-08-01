import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.scss']
})
export class CreateCompanyDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateCompanyDialogComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCompanyCreate(company) {
    this.dialogRef.close(company);
  }
}