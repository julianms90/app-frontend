import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../services/cliente.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../../models/cliente';
import { DatosAdicionalesService } from '../../../../services/datos-adicionales.service';
import { DatosAdicionales } from '../../../../models/datosAdicionales';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {

  clienteId: number;
  valorInicial = false;
  datosAdicionales: any = [];
  datosCliente: FormGroup;

  loading = false;

  constructor(private clienteService: ClienteService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private DatosAdicionalesService: DatosAdicionalesService) {
    this.clienteId = +this.aRoute.snapshot.paramMap.get('id');

    this.getCliente();
    this.datosCliente = this.fb.group({
      id: [''],
      nombreCompleto: ['', [Validators.required, Validators.maxLength(50)]],
      identificacion: ['',[Validators.required, Validators.maxLength(50)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(119)]],
      genero: [''],
      estado: [''],
      maneja: [''],
      usaLentes: [''],
      diabetico: [''],
      enfermedad: ['', [Validators.required, Validators.maxLength(200)]],
      datosAdicionales: this.fb.array([])
    });

  }

  ngOnInit(): void {

  }

  getCliente(): void {
    this.loading = true;

    // Obtengo los datos adicionales
    this.getDatosAdicionales()    
    // Obtengo el cliente
    this.clienteService.getClient(this.clienteId).subscribe(data => {
      this.loading = false;
      this.datosCliente.patchValue(data);
    });

  }

  editarCliente(): void {

    const cliente: Cliente = {
      id: this.clienteId,
      nombreCompleto: this.datosCliente.value.nombreCompleto,
      identificacion: this.datosCliente.value.identificacion,
      edad: this.datosCliente.value.edad,
      genero: this.datosCliente.value.genero,
      estado: true,
      maneja: this.datosCliente.value.maneja,
      usaLentes: this.datosCliente.value.usaLentes,
      diabetico: this.datosCliente.value.diabetico,
      enfermedad: this.datosCliente.value.enfermedad,
      datosAdicionales: this.datosCliente.value.datosAdicionales
    }

    this.loading = true;
    this.clienteService.editClient(cliente).subscribe(data => {
      this.router.navigate(['/dashboard'])
      this.toastr.success('Cliente modificado con éxito');
      this.loading = false;
    }, error => {
      this.loading = false
      console.log(error);
      this.toastr.error(error.error.message, 'Error');
    });

  }

  getDatosAdicionales(): FormArray {
    this.DatosAdicionalesService.getDatosAdicionalesById(this.clienteId).subscribe(data => {
      this.datosAdicionales = data;

    }, error => {
      this.loading = false
      console.log(error);
      this.toastr.error(error.error.message, 'Error');
    });
    console.log(this.datosAdicionales)

    return this.datosAdicionales;
  }
  deleteDatosAdicionales(index: number): void {
    this.getDatosAdicionales().removeAt(index);
  }

  disableControl(bandera: boolean): void {
    if (bandera) {
      this.datosCliente.controls['enfermedad'].enable();
      this.datosCliente.get('enfermedad').setValue('');
      // this.valorInicial = false;
      return;
    }

    this.datosCliente.controls['enfermedad'].disable();
    this.datosCliente.get('enfermedad').setValue('');
    // this.valorInicial = true;
  }
  addDatosAdicionales(): void {
    this.datosAdicionales.push(this.fb.group({
      descripcion: [''],
      estado: true,
      clienteId: this.clienteId
    }));
  }

}
