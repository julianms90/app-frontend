import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../models/cliente';

@Pipe({
  name: 'busquedaPorNombre'
})
export class BusquedaPorNombrePipe implements PipeTransform {

  transform( clientes: Cliente[], page: number = 0, search: string = '' ): Cliente[] {

    if ( search.length === 0 )
      return clientes.slice(page, page + 10);
    
    const filteredClientes = clientes.filter( cli => cli.nombreCompleto.includes( search ));
    return filteredClientes.slice(page, page + 10);

  }

}
