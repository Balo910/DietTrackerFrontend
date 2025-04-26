import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FoodEditDialogComponent } from './dialog-food/food-edit-dialog.component';
import { FoodService } from './food.service';
import { Food } from './food.model';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  private foodService = inject(FoodService);
  private dialog = inject(MatDialog);

  foodItems: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadFoods();
  }

  loadFoods() {
    this.isLoading = true;
    this.foodService.getFoods().subscribe({
      next: (data) => {
        this.foodItems = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Błąd ładowania danych';
        this.isLoading = false;
      }
    });
  }

  openEditDialog(food?: any) {
    const dialogRef = this.dialog.open(FoodEditDialogComponent, {
      data: food || { 
        name: '', 
        calories: 0, 
        proteins: 0, 
        fats: 0, 
        carbs: 0,
        date: new Date().toISOString()
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateFood(result);
        } else {
          this.addFood(result);
        }
      }
    });
  }

  addFood(food: any) {
    this.foodService.addFood(food).subscribe({
      next: () => this.loadFoods(),
      error: (err) => this.errorMessage = 'Błąd dodawania produktu'
    });
  }

  updateFood(food: any) {
    this.foodService.updateFood(food).subscribe({
      next: () => this.loadFoods(),
      error: (err) => this.errorMessage = 'Błąd aktualizacji produktu'
    });
  }

  deleteFood(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.foodService.deleteFood(id).subscribe({
        next: () => this.loadFoods(),
        error: (err) => this.errorMessage = 'Błąd usuwania produktu'
      });
    }
  }
}