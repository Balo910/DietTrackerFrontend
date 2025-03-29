import { Food } from './food.model';
import { Fluid } from './fluid.model';

export interface Diary {
  id: number;
  date: string;
  foods: Food[];
  fluids: Fluid[];
}