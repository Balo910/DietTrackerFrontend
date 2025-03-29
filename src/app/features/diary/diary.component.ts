import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../services/diary.service'; 
import { Diary } from '../../models/diary.model';
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
  diaries: Diary[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0]; 

  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.loadDiaries();
  }

  loadDiaries(): void {
    this.diaryService.getDiaries(this.selectedDate).subscribe(data => {
      this.diaries = data;
    });
  }

  onDateChange(): void {
    this.loadDiaries();
  }
}