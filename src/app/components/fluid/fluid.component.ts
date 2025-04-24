import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FluidService } from './fluid.service';
import { FluidEditDialogComponent } from './dialog-fluid/fluid-edit-dialog.component';
import { Fluid } from './fluid.model';

@Component({
  selector: 'app-fluid',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule],
  templateUrl: './fluid.component.html',
  styleUrls: ['./fluid.component.scss']
})
export class FluidComponent implements OnInit {
  private fluidService = inject(FluidService);
  private dialog = inject(MatDialog);

  fluidEntries: Fluid[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadFluids();
  }

  loadFluids() {
    this.isLoading = true;
    this.fluidService.getFluids().subscribe({
      next: data => {
        this.fluidEntries = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Błąd ładowania danych';
        this.isLoading = false;
      }
    });
  }

  openEditDialog(entry?: Fluid) {
    const dialogRef = this.dialog.open(FluidEditDialogComponent, {
      width: '500px',
      data: entry || { name: '', volume: 0, calories: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateFluid(result);
        } else {
          this.addFluid(result);
        }
      }
    });
  }

  addFluid(fluid: Fluid) {
    this.fluidService.addFluid(fluid).subscribe({
      next: () => this.loadFluids(),
      error: () => this.errorMessage = 'Błąd dodawania płynu'
    });
  }

  updateFluid(fluid: Fluid) {
    this.fluidService.updateFluid(fluid).subscribe({
      next: () => this.loadFluids(),
      error: () => this.errorMessage = 'Błąd aktualizacji płynu'
    });
  }

  deleteFluid(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten płyn?')) {
      this.fluidService.deleteFluid(id).subscribe({
        next: () => this.loadFluids(),
        error: () => this.errorMessage = 'Błąd usuwania płynu'
      });
    }
  }
}
