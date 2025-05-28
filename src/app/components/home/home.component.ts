import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  themeText = 'Ustaw ciemny motyw 🌑';

  constructor(private router: Router) {}

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.setThemeText(newTheme);
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.setThemeText(savedTheme);
  }

  private setThemeText(theme: string) {
    this.themeText = theme === 'dark' ? 'Ustaw jasny motyw ☀️' : 'Ustaw ciemny motyw 🌑';
  }

    get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  handleAuth(): void {
    if (this.isLoggedIn) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

