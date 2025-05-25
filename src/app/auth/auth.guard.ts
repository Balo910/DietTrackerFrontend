import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('token_expires');

    if (token && expires) {
      const expiresAt = parseInt(expires, 10);
      if (Date.now() < expiresAt) {
        return true; 
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires');
        console.warn('Token wygasł');
      }
    }

    this.router.navigate(['/start']); 
    return false;
  }
}
