import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  listaCliente: Cliente[] = [];
  loading = false;
  cliente: any;


  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loading = false;
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.loading = true;
    this.clienteService.getListClient().subscribe(data => {
      this.loading = false;
      this.listaCliente = data;
    });
  }

  eliminarCliente(idClient: number): void {
    if (confirm('¿Esta seguro que desea eliminar el cliente?')) {
      this.loading = true;
      this.clienteService.deleteClient(idClient).subscribe(
        data => {
          this.loading = false;
          this.toastr.success('El cliente fue eliminado con exito!', 'Registro eliminado');
          this.obtenerClientes();
        }, error => {
          console.log(error);
          this.loading = false;
          this.toastr.error(error.error.message, 'Error');
        });
    }
  }


}
