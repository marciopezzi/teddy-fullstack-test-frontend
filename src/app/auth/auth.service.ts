import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = signal<string | null>(null);
  isAuthenticated = computed(() => this.authToken() !== null);

  constructor(private router: Router) { }

  login(token: string): void {
    this.authToken.set(token);
    localStorage.setItem('authToken', token);
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authToken.set(null);
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  loadAuthState(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authToken.set(token);
    }
  }

  getToken(): string | null {
    return this.authToken();
  }
}
