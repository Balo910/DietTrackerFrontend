import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>{{ data.id ? 'Edytuj' : 'Dodaj' }} płyn</h2>
    <div class="form-group">
      <label>Nazwa:</label>
      <input [(ngModel)]="data.name" class="form-control">
    </div>
    <div class="form-group">
      <label>Ilość (ml):</label>
      <input type="number" [(ngModel)]="data.amount" class="form-control">
    </div>
    <div class="form-group">
      <label>Data:</label>
      <input type="date" [(ngModel)]="data.date" class="form-control">
    </div>
    <div class="dialog-actions">
      <button (click)="save()" class="btn-save">Zapisz</button>
      <button (click)="cancel()" class="btn-cancel">Anuluj</button>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }
    .btn-save {
      background-color: #4CAF50;
      color: white;
    }
    .btn-cancel {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class FluidEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FluidEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    this.dialogRef.close(this.data);
  }

  cancel() {
    this.dialogRef.close();
  }
}