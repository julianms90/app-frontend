import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosAdicionalesService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/DatosAdicionales';
  }

  getDatosAdicionalesById(clienteId: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${clienteId}`);
  }

}
