import { Component } from '@angular/core';
import { IClient } from '../../clients.interface';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-client',
  standalone: true,
  imports: [],
  templateUrl: './remove-client.component.html',
  styleUrl: './remove-client.component.scss'
})
export class RemoveClientComponent {
  modalRef!: NgbModalRef;
  client!: IClient;

  close() {
    this.modalRef.close();
  }

  remove() {
    this.modalRef.close('remove');
  }
}
