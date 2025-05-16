import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiaryService } from './diary.service';
import { FoodService } from '../food/food.service';
import { FluidService } from '../fluid/fluid.service';
import { DiaryEntryDialogComponent } from './dialog-entry/dialog-entry-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { FoodEditDialogComponent } from '../food/dialog-food/food-edit-dialog.component';
import { FluidEditDialogComponent } from '../fluid/dialog-fluid/fluid-edit-dialog.component';

@Component({
  selector: 'app-diary',
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule, MatTableModule],
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  private diaryService = inject(DiaryService);
  private foodService = inject(FoodService);
  private fluidService = inject(FluidService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  givenDayDiary$ = new BehaviorSubject<any[]>([]);
  currentDate = new Date();
  isLoading = false;
  errorMessage: string | null = null;
  availableFoods: any[] = [];
  availableFluids: any[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.currentDate = new Date(params['date']);
      }
      this.loadDiaries();
      this.loadAvailableItems();
      
    });
  }

loadDiaries(): void {
  this.isLoading = true;
  this.errorMessage = null;
  const formattedDate = this.formatDate(this.currentDate);

  this.diaryService.getAllDiariesWithFoodsAndFluids().subscribe({
    next: (diaries) => {
      const filteredDiaries = diaries.filter(item =>
        item.date && item.date.includes(formattedDate)
      );

      this.givenDayDiary$.next(filteredDiaries);
      const firstDiary = filteredDiaries[0];
      this.calorieGoal = firstDiary?.calorieGoal ?? 0;

      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Błąd podczas ładowania dzienników';
      this.isLoading = false;
    }
  });
}


  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadAvailableItems(): void {
    this.foodService.getFoods().subscribe(foods => this.availableFoods = foods);
    this.fluidService.getFluids().subscribe(fluids => this.availableFluids = fluids);
  }

  changeDate(days: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() + days
    );
    this.loadDiaries();
  }

  setNewDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    const dateString = input.value;
  
    if (dateString) {
      this.currentDate = new Date(dateString);
      this.loadDiaries();
    }
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(DiaryEntryDialogComponent, {
      width: '600px',
      data: {
        foods: this.availableFoods,
        fluids: this.availableFluids
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEntry(result);
      }
    });
  }

  addEntry(entry: any): void {
    this.diaryService.createDiary({
      date: this.formatDate(this.currentDate)
    }).subscribe({
      next: (newDiary) => {
        if (entry.type === 'food') {
          this.diaryService.addFoodToDiary({
            diaryId: newDiary.id,
            foodId: entry.item.id,
            weight: entry.item.weight
          }).subscribe(() => this.loadDiaries());
        } else if (entry.type === 'fluid') {
          this.diaryService.addFluidToDiary({
            diaryId: newDiary.id,
            fluidId: entry.item.id,
            volume: entry.item.volume
          }).subscribe(() => this.loadDiaries());
        }
      },
      error: (err) => {
        this.errorMessage = 'Błąd dodawania wpisu';
      }
    });
  }

  removeFood(diaryId: number, foodId: number): void {
    if (confirm('Czy na pewno usunąć ten produkt?')) {
      this.diaryService.deleteDiaryFood(diaryId, foodId)
        .subscribe(() => this.loadDiaries());
    }
  }

  removeFluid(diaryId: number, fluidId: number): void {
    if (confirm('Czy na pewno usunąć ten napój?')) {
      this.diaryService.deleteDiaryFluid(diaryId, fluidId)
        .subscribe(() => this.loadDiaries());
    }
  }

  trackByDiaryId(index: number, item: any): number {
    return item.id;
  }

  getAllFoods(diaries: any[]) {
  return diaries.flatMap(d => d.diaryFoods?.map(f => ({ ...f, diaryId: d.id })) || []);
}

getAllFluids(diaries: any[]) {
  return diaries.flatMap(d => d.diaryFluids?.map(f => ({ ...f, diaryId: d.id })) || []);
}

editFood(food: any): void {
  const dialogRef = this.dialog.open(FoodEditDialogComponent, {
    width: '600px',
    data: {
      id: food.foodId,
      name: food.foodName,
      weight: food.weight,
      calories: food.calories,
      proteins: food.proteins,
      fats: food.fats,
      carbs: food.carbs,
      diaryId: food.diaryId
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.diaryService.updateDiaryFood({
        diaryId: food.diaryId,
        foodId: food.foodId,
        weight: result.weight,
        name: result.name,
        calories: result.calories,
        proteins: result.proteins,
        fats: result.fats,
        carbs: result.carbs
      }).subscribe({
        next: () => this.loadDiaries(),
        error: (err) => console.error('Error updating food:', err)
      });
    }
  });
}

editFluid(fluid: any): void {
  const dialogRef = this.dialog.open(FluidEditDialogComponent, {
    width: '600px',
    data: {
      id: fluid.fluidId,
      name: fluid.fluidName,
      volume: fluid.volume,
      calories: fluid.calories,
      diaryId: fluid.diaryId
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.diaryService.updateDiaryFluid({
        diaryId: fluid.diaryId,
        fluidId: fluid.fluidId,
        volume: result.volume,
        name: result.name,
        calories: result.calories
      }).subscribe({
        next: () => this.loadDiaries(),
        error: (err) => console.error('Error updating fluid:', err)
      });
    }
  });
}

 getTotalCalories({ foods, fluids }: { foods: any[], fluids: any[] }): number {
   const totalFoodCalories = foods.reduce((acc: number, food: any) => acc + (food.calories || 0), 0);
   const totalFluidCalories = fluids.reduce((acc: number, fluid: any) => acc + (fluid.calories || 0), 0);
   return totalFoodCalories + totalFluidCalories;
}

calorieGoal: number = 0;

getCalorieStatus(total: number, goal: number): { message: string, class: string } {
  if (goal === 0) return { message: 'Brak ustawionego limitu kalorycznego', class: '' };

  const percent = total / goal;

  if (percent < 1) {
    return { message: `Zostało: ${goal - total} kcal`, class: '' };
  } else if (percent <= 1.05) {
    return { message: '✅ Udało Ci się uzyskać minimalne zapotrzebowanie', class: 'ok' };
  } else if (percent <= 1.15) {
    return { message: `⚠️ Lekko przekroczono o ${total - goal} kcal`, class: 'warning' };
  } else {
    return { message: `❌ Przekroczono znacznie o ${total - goal} kcal`, class: 'danger' };
  }
}

}