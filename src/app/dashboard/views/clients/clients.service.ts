import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ClientCreationDTO, IClient, IPaginatedClients } from './clients.interface';
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

  getAllPaginated(page: number, limit: number): Observable<IPaginatedClients> {
    return this.http.get<IPaginatedClients>(`${this.apiUrl}/paginated?page=${page}&limit=${limit}`);
  }

  remove(id: number) {
    return this.http.delete(this.apiUrl + "/" + id);
  }
}
