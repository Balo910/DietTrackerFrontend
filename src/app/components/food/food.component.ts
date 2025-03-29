import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../services/food.service';
import { FoodEntry } from '../../models/food.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  private foodService = inject(FoodService);
  foodItems: FoodEntry[] = []; // Zmienione foodEntries -> foodItems
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchFoods();
  }

  fetchFoods(): void {
    this.foodService.getFoods().subscribe({
      next: (items) => {
        this.foodItems = items; 
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Błąd ładowania żywności!';
        this.isLoading = false;
      }
    });
  }
}
