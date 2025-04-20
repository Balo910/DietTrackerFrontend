import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiaryService } from './diary.service';
import { FoodService } from '../food/food.service';
import { FluidService } from '../fluid/fluid.service';
import { DiaryEntryDialogComponent } from './dialog-diary-food/diary-entry-dialog.component';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule],
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  private diaryService = inject(DiaryService);
  private foodService = inject(FoodService);
  private fluidService = inject(FluidService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  mealTypes = ['Śniadanie', 'II Śniadanie', 'Przekąska', 'Obiad', 'Kolacja'];
  diaries: any[] = [];
  currentDate: Date = new Date();
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
    const dateStr = this.formatDate(this.currentDate);
    
    this.diaryService.getAllDiariesWithFoods().subscribe({
      next: (data) => {
        this.diaries = this.mealTypes.map(mealType => {
          const existingMeal = data.find((d: any) => d.mealType === mealType);
          return existingMeal || {
            mealType,
            foods: [],
            fluids: []
          };
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Błąd ładowania danych: ' + (err.error?.message || err.message);
        this.isLoading = false;
        console.error('Błąd ładowania dziennika:', err);
      }
    });
  }

  loadAvailableItems(): void {
    this.foodService.getFoods().subscribe(foods => this.availableFoods = foods);
    this.fluidService.getFluids().subscribe(fluids => this.availableFluids = fluids);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  changeDate(days: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() + days
    );
    this.loadDiaries();
  }

  openAddDialog(mealType: string): void {
    const dialogRef = this.dialog.open(DiaryEntryDialogComponent, {
      width: '600px',
      data: {
        foods: this.availableFoods,
        fluids: this.availableFluids,
        mealType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEntryToMeal(mealType, result);
      }
    });
  }

  setNewDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    const dateStr = input.value;
    this.currentDate = new Date(dateStr);
    this.loadDiaries();
  }

  addEntryToMeal(mealType: string, entry: any): void {
    const meal = this.diaries.find(m => m.mealType === mealType);
    if (!meal) {
      this.diaryService.createDiary({
        mealType,
        date: this.formatDate(this.currentDate)
      }).subscribe({
        next: (newDiary) => {
          this.addItemToMeal(newDiary.id, entry);
        },
        error: (err) => {
          this.errorMessage = 'Błąd tworzenia dziennika';
          console.error(err);
        }
      });
    } else {
      this.addItemToMeal(meal.id, entry);
    }
  }
  
  private addItemToMeal(mealId: number, entry: any): void {
    if (entry.type === 'food') {
      this.diaryService.addFoodToMeal(mealId, entry.item).subscribe({
        next: () => {
          this.loadDiaries();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Błąd dodawania jedzenia: ' + (err.error?.message || err.message);
          console.error(err);
        }
      });
    } else {
      // Obsługa płynów
  }
  }

  removeFood(mealId: number, foodId: number): void {
    this.diaryService.removeFoodFromMeal(mealId, foodId).subscribe({
      next: () => this.loadDiaries(),
      error: (err) => {
        this.errorMessage = 'Błąd podczas usuwania jedzenia';
        console.error(err);
      }
    });
  }

  removeFluid(mealId: number, fluidId: number): void {
    this.diaryService.removeFluidFromMeal(mealId, fluidId).subscribe({
      next: () => this.loadDiaries(),
      error: (err) => {
        this.errorMessage = 'Błąd podczas usuwania płynu';
        console.error(err);
      }
    });
  }
}