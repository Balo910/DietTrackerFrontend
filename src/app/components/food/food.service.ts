import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:8080/api/food';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getFoods(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  searchFoods(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?name=${name}`, { headers: this.getHeaders() });
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<any>(this.apiUrl, food, { headers: this.getHeaders() });
  }

  updateFood(food: Food): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${food.id}`, food, { headers: this.getHeaders() });
  }

  deleteFood(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}