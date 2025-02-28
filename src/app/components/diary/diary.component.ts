import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../services/diary.service';
import { Diary } from '../../models/diary.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  diaries: Diary[] = [];
  isLoading = true; 
  errorMessage: string | null = null; 

  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.diaryService.getDiaries().subscribe({
      next: (data: Diary[]) => {
        console.log('Dane z API:', data); 
        this.diaries = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Błąd pobierania dzienników:', err);
        this.errorMessage = 'Nie udało się pobrać danych. Spróbuj ponownie później.';
        this.isLoading = false;
      }
    });
  }
}
