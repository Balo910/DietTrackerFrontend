import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './app/auth/auth.guard';
import { AuthInterceptor } from './app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    AuthGuard, AuthInterceptor
  ]
}).catch(err => console.error(err));