import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FluidEditDialogComponent } from './fluid-edit-dialog.component';

@Component({
  selector: 'app-fluid',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, MatDialogModule],
  templateUrl: './fluid.component.html',
  styleUrls: ['./fluid.component.scss']
})
export class FluidComponent {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private apiUrl = 'http://localhost:8080/api';

  fluidEntries: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadFluids();
  }

  loadFluids() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/fluid`).subscribe({
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

  addFluid(fluid: any) {
    this.http.post(`${this.apiUrl}/fluid`, fluid).subscribe({
      next: () => this.loadFluids(),
      error: (err) => this.errorMessage = 'Błąd dodawania płynu'
    });
  }

  updateFluid(fluid: any) {
    this.http.put(`${this.apiUrl}/fluid/${fluid.id}`, fluid).subscribe({
      next: () => this.loadFluids(),
      error: (err) => this.errorMessage = 'Błąd aktualizacji płynu'
    });
  }

  deleteFluid(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten wpis?')) {
      this.http.delete(`${this.apiUrl}/fluid/${id}`).subscribe({
        next: () => this.loadFluids(),
        error: (err) => this.errorMessage = 'Błąd usuwania płynu'
      });
    }
  }
}