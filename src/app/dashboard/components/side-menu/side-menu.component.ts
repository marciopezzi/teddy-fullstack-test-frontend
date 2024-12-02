import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { MenuItemComponent } from "./components/menu-item/menu-item.component";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, MenuItemComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  animations: [
    trigger('menuState', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(-110%)' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SideMenuComponent {
  isOpen = false;

  clientsSubRoutes: Array<{ text: string; routerLink: string }> = [
    {
      routerLink: 'clientes-selecionados',
      text: 'Clientes Selecionados',
    },
  ];

  constructor(private authService: AuthService) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
  }
}
