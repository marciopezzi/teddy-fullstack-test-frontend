import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly apiUrl = "" + "/clients";

  constructor(private http: HttpClient) { }

  getAllClients() {
    this.http.get<any[]>(this.apiUrl);
  }
}
