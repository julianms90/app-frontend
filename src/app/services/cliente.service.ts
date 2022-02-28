import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Cliente';
  }

  addClient(cliente: Cliente): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, cliente);
  }

  getListClient(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/GetListClientes');
  }
  getClient(clienteId: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${clienteId}`);
  }

  deleteClient(clienteId: number): Observable<any>{
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${clienteId}`);
  }
  editClient(cliente: Cliente): Observable<any>{
    console.log(cliente);

    return this.http.put(this.myAppUrl + this.myApiUrl, cliente);
  }
}
