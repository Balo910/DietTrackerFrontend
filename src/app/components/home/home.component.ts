import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>DietTracker</h1>
      <p>Śledź swoje posiłki i płyny</p>
      <div class="button-container">
        <button routerLink="/diary" class="nav-button diary">
          <svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16H5V5h2v3h10V5h2v14z"/></svg>
          Dziennik
        </button>
        <button routerLink="/fluid" class="nav-button fluid">
          <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 3.19-9 7.13 0 2.68 1.82 5.01 4.5 6.2V21h3v-4h2v4h3v-4.67c2.68-1.19 4.5-3.52 4.5-6.2C21 6.19 16.97 3 12 3zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
          Płyny
        </button>
        <button routerLink="/food" class="nav-button food">
          <svg viewBox="0 0 24 24"><path d="M18 3l-3 3V3H9C6.24 3 4 5.24 4 8h5v12c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V8l3 3h2V3h-2z"/></svg>
          Żywność
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}