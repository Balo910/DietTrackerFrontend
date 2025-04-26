import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-diary-entry-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatInputModule, MatButtonModule, MatDialogContent, MatDatepickerModule],
  templateUrl: './dialog-entry-dialog.component.html',
  styleUrls: ['./dialog-entry-dialog.component.scss'],
  providers: [provideNativeDateAdapter()],
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
      const fluidWithVolume = {
        ...item,
        volume: this.selectedWeight
      };
      this.dialogRef.close({ type, item: fluidWithVolume });
    }
  }
}