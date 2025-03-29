import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluidService } from '../../services/fluid.service';
import { FluidEntry } from '../../models/fluid.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fluid',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './fluid.component.html',
  styleUrls: ['./fluid.component.scss']
})
export class FluidComponent implements OnInit {
  private fluidService: FluidService = inject(FluidService);
  
  fluidEntries: FluidEntry[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchFluids();
  }

  fetchFluids(): void {
    this.fluidService.getFluids().subscribe({
      next: (entries) => {
        this.fluidEntries = entries;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Błąd ładowania płynów!';
        this.isLoading = false;
      }
    });
  }
}
