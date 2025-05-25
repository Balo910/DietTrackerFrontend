import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {}
