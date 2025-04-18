import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FoodEditDialogComponent } from './food-edit-dialog.component';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-food',
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private apiUrl = 'http://localhost:8080/api';

  foodItems: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadFoods();
  }

  loadFoods() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/food`).subscribe({
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
        protein: 0, 
        fat: 0, 
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

  addFood(food: Food) {
    this.http.post(`${this.apiUrl}/food`, food).subscribe({
      next: () => this.loadFoods(),
      error: (err) => this.errorMessage = 'Błąd dodawania produktu'
    });
  }

  updateFood(food: any) {
    this.http.put(`${this.apiUrl}/food/${food.id}`, food).subscribe({
      next: () => this.loadFoods(),
      error: (err) => this.errorMessage = 'Błąd aktualizacji produktu'
    });
  }

  deleteFood(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.http.delete(`${this.apiUrl}/food/${id}`).subscribe({
        next: () => this.loadFoods(),
        error: (err) => this.errorMessage = 'Błąd usuwania produktu'
      });
    }
  }
}