import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

 
  diaries: any[] = [];
  currentDate: Date = new Date();
  

  isLoading = false;
  errorMessage: string | null = null;
  
  newFoodName = '';
  newFoodCalories = 0;

  ngOnInit(): void {
    this.loadDiaries();
  }

  loadDiaries(): void {
    this.isLoading = true;
    const dateStr = this.currentDate.toISOString().split('T')[0];
    
    this.http.get<any[]>(`${this.apiUrl}/diary?date=${dateStr}`).subscribe({
      next: (data) => {
        this.diaries = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Błąd ładowania danych';
        this.isLoading = false;
      }
    });
  }

  changeDate(days: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() + days
    );
    this.loadDiaries();
  }

  addFoodToMeal(mealId: number): void {
    if (!this.newFoodName || !this.newFoodCalories) return;

    this.http.post(`${this.apiUrl}/diary/${mealId}/food`, {
      name: this.newFoodName,
      calories: this.newFoodCalories,
      date: this.currentDate.toISOString()
    }).subscribe({
      next: () => {
        this.loadDiaries();
        this.newFoodName = '';
        this.newFoodCalories = 0;
      },
      error: (err) => {
        this.errorMessage = 'Błąd dodawania produktu';
      }
    });
  }

  removeFood(mealId: number, foodId: number): void {
    this.http.delete(`${this.apiUrl}/diary/${mealId}/food/${foodId}`).subscribe({
      next: () => this.loadDiaries(),
      error: (err) => this.errorMessage = 'Błąd usuwania produktu'
    });
  }
}