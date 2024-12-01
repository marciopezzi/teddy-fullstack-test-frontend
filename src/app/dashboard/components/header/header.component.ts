import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string | null;

  @Output() toggleMenu = new EventEmitter<void>();

  constructor(
    private authService: AuthService
  ) {
    this.username = this.authService.getToken();
  }

  onMenuToggle() {
    this.toggleMenu.emit();
  }

  logout() {
    this.authService.logout();
  }
}
