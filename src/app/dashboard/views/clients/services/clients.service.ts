import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ClientCreationDTO, IClient, IPaginatedClients } from '../clients.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly apiUrl = environment.apiUrl + "/clients";

  constructor(private http: HttpClient) { }

  createClient(client: ClientCreationDTO): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, client);
  }

  updateClient(id: number, changes: Partial<ClientCreationDTO>): Observable<IClient> {
    console.log(changes)
    return this.http.patch<IClient>(this.apiUrl + `/${id}`, changes);
  }

  getAllPaginated(page: number, limit: number): Observable<IPaginatedClients> {
    return this.http.get<IPaginatedClients>(`${this.apiUrl}/paginated?page=${page}&limit=${limit}`);
  }

  remove(id: number) {
    return this.http.delete(this.apiUrl + "/" + id);
  }
}
