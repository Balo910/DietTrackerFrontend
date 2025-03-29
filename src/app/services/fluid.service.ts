import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FluidService {
  private apiUrl = 'http://localhost:8080/api/fluid';

  constructor(private http: HttpClient) {}

  getFluids(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchFluids(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?name=${name}`);
  }
}