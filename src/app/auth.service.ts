import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiURLBase;
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(
    private http: HttpClient
  ) { }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/usuarios`, usuario);
  }

  tentaLogin(username: string, password: string) : Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password');
    
    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }

    return this.http.post( this.tokenURL, params.toString(), { headers });
  }
}
