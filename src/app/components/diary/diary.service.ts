import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diary } from './diary.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private apiUrl = 'http://localhost:8080/api/diary';

  constructor(private http: HttpClient) {}

  addFoodToMeal(mealId: number, food: any): Observable<any> {
    const request = {
      diaryId: mealId,
      foodId: food.id,
      weight: food.weight || 100 
    };
    return this.http.post(`${this.apiUrl}`, request);
  }

  getAllDiariesWithFoods(): Observable<Diary[]> {
    return this.http.get<Diary[]>(`${this.apiUrl}/with-foods`);
  }

  createDiary(diaryData: { mealType: string, date: string }): Observable<Diary> {
    return this.http.post<Diary>(`${this.apiUrl}/create`, diaryData);
  }

  addFluidToMeal(mealId: number, fluid: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${mealId}/fluid`, fluid);
  }

  removeFoodFromMeal(diaryId: number, foodId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${diaryId}/food/${foodId}`);
  }

  removeFluidFromMeal(mealId: number, fluidId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${mealId}/fluid/${fluidId}`);
  }
}