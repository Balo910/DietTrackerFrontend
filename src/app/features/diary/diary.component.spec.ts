import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiaryComponent } from './diary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DiaryComponent', () => {
  let component: DiaryComponent;
  let fixture: ComponentFixture<DiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});