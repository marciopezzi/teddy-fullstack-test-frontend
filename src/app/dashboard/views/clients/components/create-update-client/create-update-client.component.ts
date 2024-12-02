import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../../services/clients.service';
import { IClient } from '../../clients.interface';
import { NgxCurrencyConfig, NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-create-update-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './create-update-client.component.html',
  styleUrl: './create-update-client.component.scss'
})
export class CreateUpdateClientComponent implements OnInit {
  modalRef!: NgbModalRef;
  action!: 'create' | 'update';
  client!: IClient;

  clienteForm!: FormGroup;

  currencyInputOptions: Partial<NgxCurrencyConfig> = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    align: 'left',
    allowZero: false,
    nullable: true
  }

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
  ) { }

  ngOnInit(): void {
    const isUpdateAction = this.action === 'update';
    this.clienteForm = this.fb.group({
      name: [isUpdateAction ? this.client.name : '', Validators.required],
      salary: [isUpdateAction ? this.client.salary : null, [Validators.required]],
      companyValue: [isUpdateAction ? this.client.companyValue : null, [Validators.required]]
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
        this.clientsService.updateClient(this.client.id, clienteData).subscribe({
          next: () => {
            this.modalRef?.close(true);
          }
        });
      }
    }
  }
}
