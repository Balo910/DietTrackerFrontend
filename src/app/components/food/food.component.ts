import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  newFood = { name: '', weight: 100, calories: 200 };

  constructor(private apiService: ApiService) {}

  addFood() {
    this.apiService.addFood(this.newFood).subscribe(() => {
      alert('Dodano jedzenie!');
    });
  }
}
