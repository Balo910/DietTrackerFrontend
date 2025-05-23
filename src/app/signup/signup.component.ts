import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
    @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
    @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
    @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef<HTMLInputElement>;

    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private http: HttpClient,
        private router: Router
    ) { }

    ngAfterViewInit(): void {
        this.fadeInContainer();
    }

    register(): void {
        const userData = this.getFormData();

        if (!this.validateForm(userData)) return;

        this.submitRegistration(userData);
    }

    private getFormData() {
        return {
            username: this.usernameInput.nativeElement.value.trim(),
            password: this.passwordInput.nativeElement.value,
            confirmPassword: this.confirmPasswordInput.nativeElement.value
        };
    }

    private validateForm(data: { username: string, password: string, confirmPassword: string }): boolean {
        if (!data.username || !data.password || !data.confirmPassword) {
            this.errorMessage = 'Wypełnij wszystkie pola';
            this.shakeContainer();
            return false;
        }

        if (data.password !== data.confirmPassword) {
            this.errorMessage = 'Hasła nie są identyczne';
            this.shakeContainer();
            return false;
        }

        return true;
    }

    private submitRegistration(data: { username: string, password: string }): void {
        this.http.post('http://localhost:8080/req/signup', {
            username: data.username,
            password: data.password
        }, { responseType: 'text' }).subscribe({
            next: (response: string) => {
                this.successMessage = response || 'Rejestracja udana!';
                this.errorMessage = '';
                setTimeout(() => this.router.navigate(['/login']), 3000);
            },
            error: (err: HttpErrorResponse) => {
                this.errorMessage = err.error || 'Błąd podczas rejestracji';
                this.successMessage = '';
                this.shakeContainer();
            }
        });
    }

    private fadeInContainer(): void {
        const container = this.elRef.nativeElement.querySelector('.signup-container');
        if (container) {
            this.renderer.setStyle(container, 'opacity', '0');
            setTimeout(() => {
                this.renderer.setStyle(container, 'transition', 'opacity 0.5s ease');
                this.renderer.setStyle(container, 'opacity', '1');
            }, 100);
        }
    }

    private shakeContainer(): void {
        const container = this.elRef.nativeElement.querySelector('.signup-container');
        if (container) {
            this.renderer.addClass(container, 'shake');
            setTimeout(() => this.renderer.removeClass(container, 'shake'), 500);
        }
    }
}