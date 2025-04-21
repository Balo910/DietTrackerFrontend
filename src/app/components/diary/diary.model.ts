import { Food } from '../food/food.model';
import { Fluid } from '../fluid/fluid.model';
import { FoodInDiary } from '../food/food-in-diary.model';

export interface Diary {
  id: number;
  date: string;
  mealType: string; 
  diaryFoods: FoodInDiary[];
  fluids: Fluid[];
}