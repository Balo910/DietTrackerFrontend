import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  
  private apiUrl = 'http://localhost:8080/api/food'; 

  constructor(private http: HttpClient) {}

  getFoods(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchFoods(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?name=${name}`);
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<any>(this.apiUrl, food);
  }

  updateFood(food: Food): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${food.id}`, food);
  }

  deleteFood(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
