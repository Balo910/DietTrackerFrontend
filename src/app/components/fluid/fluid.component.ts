import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FluidEditDialogComponent } from './dialog-fluid/fluid-edit-dialog.component';
import { FluidService } from './fluid.service';
import { Fluid } from './fluid.model';

@Component({
  selector: 'app-fluid',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule],
  templateUrl: './fluid.component.html',
  styleUrls: ['./fluid.component.scss']
})
export class FluidComponent {
  private fluidService = inject(FluidService);
  private dialog = inject(MatDialog);

  fluidItems: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadFluids();
  }

  loadFluids() {
    this.isLoading = true;
    this.fluidService.getFluids().subscribe({
      next: (data) => {
        this.fluidItems = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Błąd ładowania danych';
        this.isLoading = false;
      }
    });
  }

  openEditDialog(fluid?: any) {
    const dialogRef = this.dialog.open(FluidEditDialogComponent, {
      data: fluid || { 
        name: '', 
        calories: 0, 
        date: new Date().toISOString()
      },
      width: '500px'
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

  addFluid(fluid: any) {
    this.fluidService.addFluid(fluid).subscribe({
      next: () => this.loadFluids(),
      error: (err) => this.errorMessage = 'Błąd dodawania napoju'
    });
  }

  updateFluid(fluid: any) {
    this.fluidService.updateFluid(fluid).subscribe({
      next: () => this.loadFluids(),
      error: (err) => this.errorMessage = 'Błąd aktualizacji napoju'
    });
  }

  deleteFluid(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten napój?')) {
      this.fluidService.deleteFluid(id).subscribe({
        next: () => this.loadFluids(),
        error: (err) => this.errorMessage = 'Błąd usuwania napoju'
      });
    }
  }
}