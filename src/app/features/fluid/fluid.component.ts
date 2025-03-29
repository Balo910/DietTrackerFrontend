import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fluid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fluid.component.html',
  styleUrls: ['./fluid.component.scss']
})
export class FluidComponent implements OnInit {
  fluids: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFluids();
  }

  loadFluids(): void {
    this.http.get<any[]>('/api/fluid').subscribe(data => {
      this.fluids = data;
    });
  }

  searchFluid(): void {
    this.http.get<any[]>(`/api/fluid?name=${this.searchTerm}`).subscribe(data => {
      this.fluids = data;
    });
  }
}