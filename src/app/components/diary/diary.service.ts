import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  constructor(private http: HttpClient) {}

  getAllDiariesWithFoodsAndFluids(): Observable<any[]> {
    return this.http.get<any[]>('/api/diary/with-foods');
  }

  createDiary(data: { date: string }): Observable<any> {
    return this.http.post<any>('/api/diary/create', data);
  }

  addFoodToDiary(data: { diaryId: number, foodId: number, weight: number }): Observable<any> {
    return this.http.post<any>('/api/diary/add-food', data);
  }

  addFluidToDiary(data: { diaryId: number, fluidId: number, volume: number }): Observable<any> {
    return this.http.post<any>('/api/diary/add-fluid', data);
  }

  deleteDiaryFood(diaryId: number, foodId: number): Observable<void> {
    return this.http.delete<void>(`/api/diary/${diaryId}/food/${foodId}`);
  }

  deleteDiaryFluid(diaryId: number, fluidId: number): Observable<void> {
    return this.http.delete<void>(`/api/diary/${diaryId}/fluid/${fluidId}`);
  }
}