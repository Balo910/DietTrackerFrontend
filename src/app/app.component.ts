import { Component } from '@angular/core';
import { DiaryService } from './services/diary.service';
import { Diary } from './models/diary.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  diaries: Diary[] = [];

  constructor(private diaryService: DiaryService) {}

  loadDiaries(): void {
    this.diaryService.getDiaries().subscribe({
      next: (data: Diary[]) => {
        this.diaries = data;
      },
      error: (err) => {
        console.error('Błąd pobierania dzienników:', err);
      }
    });
  }
}
