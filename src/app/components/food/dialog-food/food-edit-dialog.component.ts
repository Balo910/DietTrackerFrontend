import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-food-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './food-edit-dialog.component.html',
  styleUrls: ['./food-edit-dialog.component.scss']
})
export class FoodEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FoodEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      weight: [data.weight, [Validators.required, Validators.min(1)]],
      calories: [data.calories, Validators.required],
      proteins: [data.proteins, Validators.required],
      fats: [data.fats, Validators.required],
      carbs: [data.carbs, Validators.required]
    });
  }

 save() {
  if (this.editForm.valid) {
    this.dialogRef.close({
      name: this.editForm.value.name,
      weight: this.editForm.value.weight,
      calories: this.editForm.value.calories,
      proteins: this.editForm.value.proteins,
      fats: this.editForm.value.fats,
      carbs: this.editForm.value.carbs
    });
  }
}

  cancel() {
    this.dialogRef.close();
  }
}