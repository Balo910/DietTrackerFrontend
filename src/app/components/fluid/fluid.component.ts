import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FluidEditDialogComponent } from './fluid-edit-dialog.component';
import { FluidService } from './fluid.service';
import { Fluid } from './fluid.model';

@Component({
  selector: 'app-fluid',
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule],
  templateUrl: './fluid.component.html',
  styleUrls: ['./fluid.component.scss']
})
export class FluidComponent {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  fluidEntries: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  fluidService: any;

  ngOnInit() {
    this.loadFluids();
  }

  loadFluids() {
    this.isLoading = true;
    this.fluidService.loadFluids.getFluids.subscribe({
      next: (data) => {
        this.fluidEntries = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Błąd ładowania danych';
        this.isLoading = false;
      }
    });
  }

  openEditDialog(entry?: any) {
    const dialogRef = this.dialog.open(FluidEditDialogComponent, {
      data: entry || { name: '', amount: 0, date: new Date().toISOString() },
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

  addFluid(fluid: Fluid) {
    this.fluidService.addFluid(fluid).subscribe({
      next: () => this.loadFluids(),
      error: (err) => this.errorMessage = 'Błąd dodawania płynu'
    });
  }

  updateFluid(fluid: Fluid) {
    this.fluidService.updateFluid(fluid).subscribe({
      next: () => this.loadFluids(),
      error: (err) => this.errorMessage = 'Błąd aktualizacji płynu'
    });
  }

  deleteFluid(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten wpis?')) {
      this.fluidService.deleteFluid(id).subscribe({
        next: () => this.loadFluids(),
        error: (err) => this.errorMessage = 'Błąd usuwania płynu'
      });
    }
  }
}