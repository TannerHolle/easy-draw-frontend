import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DrawData {
  name: string;
}

@Component({
  selector: 'app-draw-name-dialog',
  templateUrl: './draw-name-dialog.component.html',
  styleUrls: ['./draw-name-dialog.component.scss']
})
export class DrawNameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DrawNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DrawData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
