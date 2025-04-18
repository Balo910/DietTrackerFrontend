import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8080/api/dicts/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}