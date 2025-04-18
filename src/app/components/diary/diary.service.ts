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

  getDiaries(date: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(`${this.apiUrl}?date=${date}`);
  }
}