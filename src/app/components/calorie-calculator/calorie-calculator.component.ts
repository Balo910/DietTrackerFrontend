import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calorie-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.scss']
})
export class CalorieCalculatorComponent {

  private http = inject(HttpClient);

  weight = 70;
  height = 175;
  age = 25;
  gender: 'male' | 'female' = 'male';
  activityLevel = 'umiarkowana';
  goal: 'lose' | 'maintain' | 'gain' = 'maintain';
  calories: number | null = null;
  bmi: number | null = null;
  interpretation = '';

  activityFactors: { [key: string]: number } = {
    'bardzo niska': 1.2,
    'niska': 1.375,
    'umiarkowana': 1.55,
    'aktywny tryb życia': 1.725,
    'bardzo aktywny tryb życia': 1.9
  };

  isValidAge(): boolean {
    return this.age > 0 && this.age <= 123;
  }

  isValidHeight(): boolean {
    return this.height > 0 && this.height <= 272;
  }

  isValidWeight(): boolean {
    return this.weight > 0 && this.weight <= 635;
  }

  calculateAll(): void {
    if (this.isValidAge() && this.isValidHeight() && this.isValidWeight()) {
      this.calculateBMI();
      this.calculateCalories();
    } else {
      alert('Proszę wprowadzić poprawne wartości');
    }
  }

  calculateBMI(): void {
    const heightInMeters = this.height / 100;
    this.bmi = +(this.weight / (heightInMeters * heightInMeters)).toFixed(1);

    if (this.bmi < 16) this.interpretation = 'Wygłodzenie';
    else if (this.bmi < 17) this.interpretation = 'Wychudzenie';
    else if (this.bmi < 18.5) this.interpretation = 'Niedowaga';
    else if (this.bmi < 25) this.interpretation = 'Waga prawidłowa';
    else if (this.bmi < 30) this.interpretation = 'Nadwaga';
    else if (this.bmi < 35) this.interpretation = 'Otyłość I stopnia';
    else if (this.bmi < 40) this.interpretation = 'Otyłość II stopnia';
    else this.interpretation = 'Otyłość III stopnia';
  }

calculateCalories(): void {
  let bmr: number = this.gender === 'male'
    ? 10 * this.weight + 6.25 * this.height - 5 * this.age + 5
    : 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;

  const activityFactor = this.activityFactors[this.activityLevel];
  let tdee = bmr * activityFactor;

  if (this.goal === 'lose') tdee *= 0.85;
  else if (this.goal === 'gain') tdee *= 1.15;

  this.calories = Math.round(tdee);
}
}
  