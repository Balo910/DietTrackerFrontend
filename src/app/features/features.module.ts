import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary/diary.component';
import { FluidComponent } from './fluid/fluid.component';
import { FoodComponent } from './food/food.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module'; 

@NgModule({
  declarations: [
    DiaryComponent,
    FluidComponent,
    FoodComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    DiaryComponent,
    FluidComponent,
    FoodComponent,
    HomeComponent
  ]
})
export class FeaturesModule {}
