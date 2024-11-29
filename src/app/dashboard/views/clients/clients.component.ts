import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor, NgIf } from '@angular/common';
import { IClient } from './clients.interface';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgxPaginationModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: IClient[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 8;
  currentPage: number = 1;

  constructor(private service: ClientsService) { }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.service.getAllPaginated(this.currentPage, this.itemsPerPage).subscribe({
      next: (res) => {
        this.clients = res.data;
        this.totalItems = res.total;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  createClient() {
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchClients();
  }

  onItemsPerPageChange(newLimit: number): void {
    this.itemsPerPage = newLimit;
    this.currentPage = 1;
    this.fetchClients();
  }

  removeItem(id: number) {
    this.service.remove(id).subscribe({
      next: () => {
        this.fetchClients();
      },
      error: () => { }
    })
  }
}
