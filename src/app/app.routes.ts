import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DiaryComponent } from './components/diary/diary.component';
import { FluidComponent } from './components/fluid/fluid.component';
import { FoodComponent } from './components/food/food.component';
import { CalorieCalculatorComponent } from './components/calorie-calculator/calorie-calculator.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    component: SignupComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'diary', 
    component: DiaryComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'fluid', 
    component: FluidComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'food', 
    component: FoodComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'calories', 
    component: CalorieCalculatorComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}