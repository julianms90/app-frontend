import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myApiUrl: string;
  myiApiUrl: string;
  constructor(private http: HttpClient) {
    this.myApiUrl = environment.endpoint;
    this.myiApiUrl = '/api/login'
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.myApiUrl + this.myiApiUrl, usuario);
  }

  setLocalStorage(data): void {
    localStorage.setItem('token', data)
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    return decodedToken;
  }

  removeNombreUsuario(): void {
    localStorage.removeItem('token')
  }
}
