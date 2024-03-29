import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente!: Cliente;
  success: boolean = false;
  errors!: String[];
  id!: number;

  constructor( 
    private service: ClientesService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params =>{
      if(params && params.id){
        this.service.getClienteById(params.id).subscribe(response =>{
          this.cliente = response;
        })
      }
    })
    
  }

  onSubmit(){
    if(this.id){
      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Error ao atualizar o cliente.']
        })
    } else{
        this.service
          .salvar(this.cliente)
          .subscribe( response => {
            this.success = true;
            this.errors = [];
            this.cliente = response;
          } , errorResponse => {
            this.errors = errorResponse.error.errors;
            this.success = false;
          }
        )
    }


    
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes/lista']);
  }
}
