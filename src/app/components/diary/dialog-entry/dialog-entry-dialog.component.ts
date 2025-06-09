import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-diary-entry-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatInputModule, MatButtonModule, MatDialogContent, MatDatepickerModule, MatAutocompleteModule, MatFormFieldModule],
  templateUrl: './dialog-entry-dialog.component.html',
  styleUrls: ['./dialog-entry-dialog.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class DiaryEntryDialogComponent {
  searchFoodText = '';
  searchFluidText = '';
  filteredFoods: any[] = [];
  filteredFluids: any[] = [];
  selectedWeight = 100;
  selectedVolume = 100;

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

ngOnInit() {
  this.filteredFoods = [...this.data.foods];
  this.filteredFluids = [...this.data.fluids];
}

filterFoods() {
  this.filteredFoods = this.data.foods.filter(food =>
    food.name.toLowerCase().includes((this.searchFoodText || '').toLowerCase())
  );
}

filterFluids() {
  this.filteredFluids = this.data.fluids.filter(fluid =>
    fluid.name.toLowerCase().includes((this.searchFluidText || '').toLowerCase())
  );
}

onFoodSelected(food: any) {
  const foodWithWeight = {
    ...food,
    weight: this.selectedWeight
  };
  this.dialogRef.close({ type: 'food', item: foodWithWeight });
}

onFluidSelected(fluid: any) {
  const fluidWithVolume = {
    ...fluid,
    volume: this.selectedVolume,
    calories: Math.round((fluid.calories / 100) * this.selectedVolume * 10) / 10
  };
  this.dialogRef.close({ type: 'fluid', item: fluidWithVolume });
}

}