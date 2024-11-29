import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string | null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.username = this.authService.getToken();
  }

  logout() {
    this.authService.logout();
  }
}
