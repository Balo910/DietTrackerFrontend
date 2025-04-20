import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-diary-entry-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Dodaj do {{ data.mealType }}</h2>
    <mat-tab-group>
      <mat-tab label="Żywność">
        <div class="tab-content">
          <div class="food-details">
            <div class="form-group">
              <label>Waga (g):</label>
              <input type="number" [(ngModel)]="selectedWeight" class="form-control" min="1" value="100">
            </div>
          </div>
          <div *ngFor="let food of data.foods" class="item" (click)="selectItem('food', food)">
            {{ food.name }} ({{ food.calories }} kcal/100g)
          </div>
        </div>
      </mat-tab>
      <mat-tab label="Płyny">
        <div class="tab-content">
          <div *ngFor="let fluid of data.fluids" class="item" (click)="selectItem('fluid', fluid)">
            {{ fluid.name }} ({{ fluid.amount }} ml)
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
    <div class="actions">
      <button mat-button (click)="dialogRef.close()">Anuluj</button>
    </div>
  `,
  styles: [`
    .tab-content {
      max-height: 400px;
      overflow-y: auto;
      padding: 16px;
    }
    .item {
      padding: 8px;
      margin: 4px 0;
      border: 1px solid #eee;
      border-radius: 4px;
      cursor: pointer;
    }
    .item:hover {
      background-color: #f5f5f5;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      padding: 16px;
      border-top: 1px solid #eee;
    }
    .food-details {
      padding: 8px;
      margin-bottom: 12px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    .form-group {
      margin-bottom: 0;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class DiaryEntryDialogComponent {
  selectedWeight = 100;

  constructor(
    public dialogRef: MatDialogRef<DiaryEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectItem(type: string, item: any) {
    if (type === 'food') {
      const foodWithWeight = {
        ...item,
        weight: this.selectedWeight
      };
      this.dialogRef.close({ type, item: foodWithWeight });
    } else {
      this.dialogRef.close({ type, item });
    }
  }
}