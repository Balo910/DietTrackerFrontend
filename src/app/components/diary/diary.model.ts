import { Food } from '../food/food.model';
import { Fluid } from '../fluid/fluid.model';

export interface Diary {
  id: number;
  date: string;
  foods: Food[];
  fluids: Fluid[];
}