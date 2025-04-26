export interface DiaryWithFoodsAndFluidsDTO {
    id: number;
    date: string;
    diaryFoods: DiaryFoodDTO[];
    diaryFluids: DiaryFluidDTO[];
  }
  
  export interface DiaryFoodDTO {
    id: number;
    diaryId: number;
    foodId: number;
    foodName: string;
    weight: number;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface DiaryFluidDTO {
    id: number;
    diaryId: number;
    fluidId: number;
    fluidName: string;
    volume: number;
    calories: number;
    createdAt: string;
    updatedAt: string;
  }