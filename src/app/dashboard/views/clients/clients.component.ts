import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor, NgIf } from '@angular/common';
import { ClientCreationDTO, IClient } from './clients.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateClientComponent } from './components/create-update-client/create-update-client.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: IClient[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 16;
  currentPage: number = 1;
  showModal = false;

  constructor(
    private service: ClientsService,
    private modalService: NgbModal
  ) { }

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

  createOrUpdateClient(action: 'create' | 'update', clientData?: IClient) {
    const modalRef = this.modalService.open(CreateUpdateClientComponent, { centered: true, backdrop: 'static' });

    const componentInstance = modalRef.componentInstance as CreateUpdateClientComponent;
    componentInstance.modalRef = modalRef;
    componentInstance.action = action;
    if (action === 'update' && clientData) {
      componentInstance.clientId = clientData.id;
    }

    modalRef.result.then(
      (result) => {
        if (result) {
          this.fetchClients();
        }
      },
    );
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
