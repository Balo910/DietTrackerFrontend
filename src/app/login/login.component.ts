import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  
  errorMessage: string = '';

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.fadeInContainer();
  }

  login(): void {
    const username = this.usernameInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;

    if (!this.validateInputs(username, password)) return;

    this.attemptLogin(username, password);
  }

  private validateInputs(username: string, password: string): boolean {
    if (!username || !password) {
      this.errorMessage = 'Wprowadź nazwę użytkownika i hasło';
      this.shakeContainer();
      return false;
    }
    return true;
  }

  private attemptLogin(username: string, password: string): void {
    const loginData = { username, password };
    console.log('Sending login request:', loginData);
    this.http.post<LoginResponse>('http://localhost:8080/req/login', loginData, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (err: HttpErrorResponse) => this.handleLoginError(err)
    });
  }

  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    this.errorMessage = '';
    this.router.navigate(['/home']);
  }

  private handleLoginError(error: HttpErrorResponse): void {
    console.log('Login error:', error);
    this.errorMessage = error.error || 
                        (error.status === 401 ? 'Nieprawidłowe dane logowania' : 
                        error.status === 403 ? 'Dostęp zabroniony' : 
                        'Błąd połączenia z serwerem');
    this.shakeContainer();
  }

  private fadeInContainer(): void {
    const container = this.elRef.nativeElement.querySelector('.login-container');
    if (container) {
      this.renderer.setStyle(container, 'opacity', '0');
      setTimeout(() => {
        this.renderer.setStyle(container, 'transition', 'opacity 0.5s ease');
        this.renderer.setStyle(container, 'opacity', '1');
      }, 100);
    }
  }

  private shakeContainer(): void {
    const container = this.elRef.nativeElement.querySelector('.login-container');
    if (container) {
      this.renderer.addClass(container, 'shake');
      setTimeout(() => this.renderer.removeClass(container, 'shake'), 500);
    }
  }
}