import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DiaryComponent } from './components/diary/diary.component';
import { FluidComponent } from './components/fluid/fluid.component';
import { FoodComponent } from './components/food/food.component';
import { CalorieCalculatorComponent } from './components/calorie-calculator/calorie-calculator.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'fluid', component: FluidComponent },
  { path: 'food', component: FoodComponent},
  { path: 'calories', component: CalorieCalculatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }