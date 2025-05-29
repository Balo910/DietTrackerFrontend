import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fluid-edit-dialog',
  templateUrl: './fluid-edit-dialog.component.html',
  styleUrls: ['./fluid-edit-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatDialogContent, ReactiveFormsModule]
})
export class FluidEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FluidEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      volume: [data.volume, [Validators.required, Validators.min(1)]],
      calories: [data.calories, Validators.required]
    });
  }

  save() {
  if (this.editForm.valid) {
    this.dialogRef.close({
      id: this.data.id, 
      name: this.editForm.value.name,
      volume: this.editForm.value.volume,
      calories: this.editForm.value.calories
    });
  }
}
  cancel() {
    this.dialogRef.close();
  }
}