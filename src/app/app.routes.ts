import { Routes } from '@angular/router';
import { FluidComponent } from './components/fluid/fluid.component';
import { DiaryComponent } from './components/diary/diary.component';
import { FoodComponent } from './components/food/food.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'food', component: FoodComponent },
  { path: 'fluid', component: FluidComponent },
  { path: 'diary', component: DiaryComponent }
];