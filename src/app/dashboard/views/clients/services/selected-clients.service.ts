import { Injectable, signal, effect } from '@angular/core';
import { IClient } from '../clients.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedClientsService {
  private readonly LOCAL_STORAGE_KEY = 'selectedClients';

  private selectedClients = signal<IClient[]>(this.loadFromLocalStorage());

  constructor() {
    effect(() => {
      this.saveToLocalStorage(this.selectedClients());
    });
  }

  get clients() {
    return this.selectedClients();
  }

  addClient(client: IClient): void {
    this.selectedClients.set([...this.selectedClients(), client]);
  }

  removeClient(clientId: number): void {
    this.selectedClients.set(this.selectedClients().filter(client => client.id !== clientId));
  }

  clearSelectedClients(): void {
    this.selectedClients.set([]);
  }

  private loadFromLocalStorage(): IClient[] {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(clients: IClient[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(clients));
  }
}
