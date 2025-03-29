import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodComponent } from './food.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FoodService } from '../../services/food.service';
import { of } from 'rxjs';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;
  let foodService: jasmine.SpyObj<FoodService>;

  beforeEach(async () => {
    const foodServiceSpy = jasmine.createSpyObj('FoodService', ['getFoods']);

    await TestBed.configureTestingModule({
      declarations: [FoodComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatButtonModule],
      providers: [{ provide: FoodService, useValue: foodServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    foodService = TestBed.inject(FoodService) as jasmine.SpyObj<FoodService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load food entries on init', () => {
    const mockFoods = [{ id: 1, name: 'Kurczak', calories: 200, protein: 30, fat: 5, carbs: 2 }];
    foodService.getFoods.and.returnValue(of(mockFoods));
  
    component.ngOnInit();
  
    expect(component.foodItems).toEqual(mockFoods); 
  });
});
