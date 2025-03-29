import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FoodComponent } from './features/food/food.component';
import { FluidComponent } from './features/fluid/fluid.component';
import { DiaryComponent } from './features/diary/diary.component';
import { TagComponent } from './features/tag/tag.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'food', component: FoodComponent },
  { path: 'fluid', component: FluidComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'tag', component: TagComponent }
];