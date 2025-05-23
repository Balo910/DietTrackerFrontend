import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  themeText = 'Ustaw ciemny motyw 🌑';

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
}