import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api-service/api.service';
import { HttpClient } from '@angular/common/http';
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

  updateDiaryFood(data: {
  diaryId: number,
  foodId: number,
  weight: number,
  name: string,
  calories: number,
  proteins: number,
  fats: number,
  carbs: number
}): Observable<any> {
  return this.http.put<any>(`/api/diary/${data.diaryId}/food/${data.foodId}`, {
    weight: data.weight,
    foodName: data.name,
    calories: data.calories,
    proteins: data.proteins,
    fats: data.fats,
    carbs: data.carbs
  });
}

updateDiaryFluid(data: {
  diaryId: number,
  fluidId: number,
  volume: number,
  name: string,
  calories: number
}): Observable<any> {
  return this.http.put<any>(`/api/diary/${data.diaryId}/fluid/${data.fluidId}`, {
    volume: data.volume,
    fluidName: data.name,
    calories: data.calories
  });
}
}