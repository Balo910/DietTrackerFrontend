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
          item.date && item.date.includes(formattedDate) &&
          (item.diaryFoods.length > 0 || item.diaryFluids.length > 0) 
        );
        this.givenDayDiary$.next(filteredDiaries);
        this.isLoading = false;
      },
      error: (err) => {
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
    if (confirm('Czy na pewno usunąć ten płyn?')) {
      this.diaryService.deleteDiaryFluid(diaryId, fluidId)
        .subscribe(() => this.loadDiaries());
    }
  }

  trackByDiaryId(index: number, item: any): number {
    return item.id;
  }

}