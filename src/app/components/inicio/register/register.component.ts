import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup
  loading = false;
  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService, 
    private toastr: ToastrService, 
    private router: Router) {
    this.register = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['',[ Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    }, 
    {validator: this.checkPassword})
  }

  ngOnInit(): void {
  }

  registrarUsuario(): void{
    const usuario: Usuario ={
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }
    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(data => {
      this.router.navigate(['/inicio/login'])
      this.toastr.success('Usuario registrado con éxito');
      this.loading = false;
    },error => {
      this.loading = false
      this.toastr.error(error.error.message, 'Error');
      this.register.reset;
    } 
    );
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? false : { notSame: true};
  }
}
