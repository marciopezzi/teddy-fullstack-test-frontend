import { Component } from '@angular/core';
import { ClientsService } from './clients.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [NgFor, FormsModule, NgxPaginationModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  clients: any[] = [];
  itemsPerPage: number = 16;
  currentPage: number = 1;
  
  constructor(private service: ClientsService) { }

  createClient() {}
}
