import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 

import { HomeComponent } from './features/home/home.component';
import { DiaryComponent } from './features/diary/diary.component';
import { FoodComponent } from './features/food/food.component';
import { FluidComponent } from './features/fluid/fluid.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiaryComponent,
    FoodComponent,
    FluidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
