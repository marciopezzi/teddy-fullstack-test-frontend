import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../../services/clients.service';
import { ClientCreationDTO, IClient } from '../../clients.interface';

@Component({
  selector: 'app-create-update-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-update-client.component.html',
  styleUrl: './create-update-client.component.scss'
})
export class CreateUpdateClientComponent {
  modalRef!: NgbModalRef;
  action!: 'create' | 'update';
  clientId!: number;

  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {
    this.clienteForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      companyValue: ['', [Validators.required, Validators.min(0)]]
    });
  }

  close() {
    this.modalRef?.close();
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;

      if (this.action === 'create') {
        this.clientsService.createClient(clienteData).subscribe({
          next: () => {
            this.modalRef?.close(true);
          }
        });
      } else if (this.action === 'update') {
        this.clientsService.updateClient(this.clientId, clienteData).subscribe({
          next: () => {
            this.modalRef?.close(true);
          }
        });
      }
    }
  }
}
