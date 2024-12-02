import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() text: string = '';
  @Input() routerLink: string | null = null;
  @Input() icon: string | null = null;
  @Input() subRoutes: Array<{ text: string; routerLink: string }> | null = null;
}
