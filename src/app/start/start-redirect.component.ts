import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-redirect',
  template: ''
})
export class StartRedirectComponent {
  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('token_expires');

    const isTokenValid = token && expires && Date.now() < +expires;

    if (isTokenValid) {
      router.navigate(['/home']);
    } else {
      router.navigate(['/start']);
    }
  }
}
