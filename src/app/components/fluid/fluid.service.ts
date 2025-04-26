import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fluid } from './fluid.model';

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

  addFluid(fluid: Fluid): Observable<Fluid> {
    return this.http.post<any>(this.apiUrl, fluid);
  }

  updateFluid(fluid: Fluid): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${fluid.id}`, fluid);
  }

  deleteFluid(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
