import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getDiaries(): Observable<any> {
    return this.http.get(`${API_URL}/diary`);
  }

  getDiaryById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/diary/${id}`);
  }

  addDiary(diary: any): Observable<any> {
    return this.http.post(`${API_URL}/diary`, diary);
  }

  updateDiary(id: number, diary: any): Observable<any> {
    return this.http.put(`${API_URL}/diary/${id}`, diary);
  }

  deleteDiary(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/diary/${id}`);
  }

  getFoods(): Observable<any> {
    return this.http.get(`${API_URL}/food`);
  }

  addFood(food: any): Observable<any> {
    return this.http.post(`${API_URL}/food`, food);
  }

  getFluids(): Observable<any> {
    return this.http.get(`${API_URL}/fluid`);
  }
}
