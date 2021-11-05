import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http: HttpClient) { 
  }

  salvar( cliente: Cliente ) : Observable<Cliente>{
    return this.http.post<Cliente>('http://localhost:8081/api/clientes', cliente);
  }

  getCliente() : Cliente {
    let cliente: Cliente = new Cliente();
    cliente.nome = "Jasson Luiz";
    cliente.cpf = "11284368416";
    return cliente;
  }
}
