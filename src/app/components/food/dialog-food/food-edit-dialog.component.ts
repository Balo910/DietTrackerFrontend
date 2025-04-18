import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: "./food-edit-dialog.component.html",
  styleUrls: ["./food-edit-dialog.component.scss"],
  
})
export class FoodEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FoodEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    this.dialogRef.close(this.data); 
  }

  cancel() {
    this.dialogRef.close();
  }
}