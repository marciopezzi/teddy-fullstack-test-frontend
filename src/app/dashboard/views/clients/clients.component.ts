import { Component, OnInit } from '@angular/core';
import { ClientsService } from './services/clients.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyPipe, NgFor, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { IClient } from './clients.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateClientComponent } from './components/create-update-client/create-update-client.component';
import { SelectedClientsService } from './services/selected-clients.service';
import { ActivatedRoute } from '@angular/router';
import { RemoveClientComponent } from './components/remove-client/remove-client.component';

registerLocaleData(localePt, 'pt-BR');

type ClientWithSelection = IClient & { selected: boolean };

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgxPaginationModule,
    CurrencyPipe
  ],
  providers: [CurrencyPipe],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: ClientWithSelection[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 16;
  currentPage: number = 1;
  showModal = false;

  selectedClients: IClient[] = [];
  private selectedClientIds: Set<number> = new Set();
  onlySelectedClients: boolean = false;

  constructor(
    private service: ClientsService,
    private clientsSelectionService: SelectedClientsService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadState();
    this.loadSelectedClients();

    this.route.url.subscribe((urlSegments) => {
      this.onlySelectedClients = urlSegments.some(segment => segment.path === 'clientes-selecionados');
      this.fetchClients();
    });
  }

  private saveState(): void {
    const state = {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };
    localStorage.setItem('clientsTableState', JSON.stringify(state));
  }

  private loadState(): void {
    const state = localStorage.getItem('clientsTableState');
    if (state) {
      const { currentPage, itemsPerPage } = JSON.parse(state);
      this.currentPage = currentPage || 1;
      this.itemsPerPage = itemsPerPage || 16;
    }
  }

  fetchClients() {
    if (this.onlySelectedClients) {
      this.updateClients();
    } else {
      this.service.getAllPaginated(this.currentPage, this.itemsPerPage).subscribe({
        next: (res) => {
          this.clients = res.data.map(c => ({
            ...c,
            selected: this.checkSelectedClient(c),
          }));
          this.totalItems = res.total;
        },
        error: (err) => console.error(err),
      });
    }
  }

  checkSelectedClient(client: IClient): boolean {
    return this.selectedClientIds.has(client.id);
  }

  loadSelectedClients() {
    this.selectedClients = this.clientsSelectionService.clients;
    this.selectedClientIds = new Set(this.selectedClients.map(c => c.id));
    this.updateClients();
  }

  createOrUpdateClient(action: 'create' | 'update', clientData?: IClient) {
    const modalRef = this.modalService.open(CreateUpdateClientComponent, { centered: true, backdrop: 'static' });

    const componentInstance = modalRef.componentInstance as CreateUpdateClientComponent;
    componentInstance.modalRef = modalRef;
    componentInstance.action = action;
    if (action === 'update' && clientData) {
      componentInstance.client = clientData;
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
    this.saveState();
    if (!this.onlySelectedClients) {
      this.fetchClients();
    }
  }

  onItemsPerPageChange(newLimit: number): void {
    this.itemsPerPage = newLimit;
    this.currentPage = 1;
    this.saveState();
    this.fetchClients();
  }

  removeItem(client: IClient) {
    const modalRef = this.modalService.open(RemoveClientComponent, { centered: true, backdrop: 'static' });
    const componentInstance = modalRef.componentInstance as RemoveClientComponent;
    componentInstance.modalRef = modalRef;
    componentInstance.client = client;

    modalRef.result.then(
      (result) => {
        if (result === 'remove') {
          this.service.remove(client.id).subscribe({
            next: () => {
              this.clients = this.clients.filter(c => c.id !== client.id);
              this.selectedClients = this.selectedClients.filter(c => c.id !== client.id);
              this.selectedClientIds.delete(client.id);
              if (this.onlySelectedClients) {
                this.totalItems = this.selectedClients.length;
              } else {
                this.fetchClients();
              }
            },
            error: (err) => console.error(err),
          });
        }
      },
    );
  }


  addClientToSelection(client: ClientWithSelection) {
    this.clientsSelectionService.addClient(client);
    client.selected = true;
    this.loadSelectedClients();
  }

  removeClientOfSelection(client: ClientWithSelection) {
    this.clientsSelectionService.removeClient(client.id);
    client.selected = false;
    this.loadSelectedClients();
  }

  resetClientSelection() {
    this.clientsSelectionService.clearSelectedClients();
    this.loadSelectedClients();
  }


  private updateClients(): void {
    if (this.onlySelectedClients) {
      this.clients = this.selectedClients.map(c => ({ ...c, selected: true }));
      this.totalItems = this.clients.length;
    }
  }

}
