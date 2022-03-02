import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      passwordNuevo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    }, { validator: this.checkPassword })
  }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.passwordNuevo.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true};
  }

  guardarPassword(): void {

    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      passwordNuevo: this.cambiarPassword.value.passwordNuevo
    };
    console.log(changePassword);
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.toastr.info(data.message);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error!');
    });
  }

}
