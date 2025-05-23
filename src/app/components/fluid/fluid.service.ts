import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fluid } from './fluid.model';

@Injectable({
  providedIn: 'root'
})
export class FluidService {
  private apiUrl = 'http://localhost:8080/api/fluid';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getFluids(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  searchFluids(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?name=${name}`, { headers: this.getHeaders() });
  }

  addFluid(fluid: Fluid): Observable<Fluid> {
    return this.http.post<any>(this.apiUrl, fluid, { headers: this.getHeaders() });
  }

  updateFluid(fluid: Fluid): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${fluid.id}`, fluid, { headers: this.getHeaders() });
  }

  deleteFluid(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}