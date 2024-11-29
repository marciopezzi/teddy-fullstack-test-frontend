import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    if (this.username.trim()) {
      const token = this.username;
      this.authService.login(token);
    } else {
      console.log('Por favor, insira um nome válido.');
    }
  }
}
