import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';

  onSubmit(): void {
    if (this.username.trim()) {
      console.log(`Bem-vindo, ${this.username}!`);
    } else {
      console.log('Por favor, insira um nome válido.');
    }
  }
}
