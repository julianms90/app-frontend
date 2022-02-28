import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../../models/cliente';
import { DatosAdicionales } from '../../../../models/datosAdicionales';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  datosCliente: FormGroup;
  loading = false;
  valorInicial = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService) {
      this.datosCliente = this.fb.group({
        nombreCompleto: ['', Validators.required],
        identificacion: ['', Validators.required],
        edad: ['', Validators.required],
        genero: [undefined, Validators.required],
        estado: true,
        maneja: false,
        usaLentes: false,
        diabetico: false,
        enfermedad: [{ value: '', disabled: true }],
        datosAdicionales: this.fb.array([])
      });
  
  }

  ngOnInit(): void {
  }

  guardarClient(): void {

    const arrayDatosAdicionales = this.datosCliente.get('datosAdicionales').value;
    const arrayDatos: DatosAdicionales[] = [];

    arrayDatosAdicionales.forEach((element) => {
      const datos: DatosAdicionales = new DatosAdicionales(element.descripcion, element.estado, element.clienteId);
      datos.estado = true;
      arrayDatos.push(datos);
    });



    const cliente: Cliente = {
      id: this.datosCliente.value.id,
      nombreCompleto: this.datosCliente.value.nombreCompleto,
      identificacion: this.datosCliente.value.identificacion,
      edad: this.datosCliente.value.edad,
      genero: this.datosCliente.value.genero,
      estado: this.datosCliente.value.estado,
      maneja: this.datosCliente.value.maneja,
      usaLentes: this.datosCliente.value.usaLentes,
      diabetico: this.datosCliente.value.diabetico,
      enfermedad: this.datosCliente.value.enfermedad,
      datosAdicionales: arrayDatos
    }


    this.loading = true;
    this.clienteService.addClient(cliente).subscribe(data => {

      this.router.navigate(['/dashboard'])
      this.toastr.success('Cliente registrado con éxito');
      this.loading = false;
    }, error => {
      this.loading = false
      console.log(error);
      this.toastr.error(error.error.message, 'Error');
      this.datosCliente.reset;
    });
  }

  get getDatosAdicionales(): FormArray {
    return this.datosCliente.get('datosAdicionales') as FormArray;
  }

  addDatosAdicionales(): void {
    this.getDatosAdicionales.push(this.fb.group({
      descripcion: ['']
    }));
  }
  deleteDatosAdicionales(index: number): void {
    this.getDatosAdicionales.removeAt(index);
  }

  disableControl(): void {
    if (this.valorInicial) {
      this.datosCliente.controls['enfermedad'].enable();
      this.valorInicial = false;
      return;
    }
    this.datosCliente.controls['enfermedad'].disable();
    this.datosCliente.get('enfermedad').setValue('');
    this.valorInicial = true;
  }
}
