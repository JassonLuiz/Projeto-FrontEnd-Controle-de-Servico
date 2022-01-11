import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service'
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styles: [
  ]
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico!: ServicoPrestado;
  success: boolean = false;
  errors!: string[];

  constructor(
    private clienteService: ClientesService,
    private service: ServicoPrestadoService,
    private router: Router
  ) { 
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe( response => this.clientes = response);
  }

  onSubmite(){
    this.service
      .salvar(this.servico)
      .subscribe( response => {
        this.success = true;
        this.errors = [];
        this.servico = new ServicoPrestado();
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }

  voltarParaLista(){
    this.router.navigate(['/servicos-prestados/lista']);
  }

}
