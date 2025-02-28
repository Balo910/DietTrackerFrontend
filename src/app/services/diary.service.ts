import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diary } from '../models/diary.model'; 

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private apiUrl = 'http://localhost:8080/api/diary';

  constructor(private http: HttpClient) {}

  getDiaries(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.apiUrl);
  }
}
