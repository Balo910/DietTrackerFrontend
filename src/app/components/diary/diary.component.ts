import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  diaries: any[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0]; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDiaries();
  }

  loadDiaries(): void {
    this.http.get<any[]>(`/api/diary?date=${this.selectedDate}`).subscribe(data => {
      this.diaries = data;
    });
  }

  onDateChange(): void {
    this.loadDiaries();
  }
}