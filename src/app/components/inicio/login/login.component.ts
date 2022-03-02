import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  login: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService) {
    this.login = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
  }
  ngOnInit(): void { }

  log(): void {
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }
    this.loading = true;
    setTimeout(() => {

      this.loginService.login(usuario).subscribe(data => {
        this.loginService.setLocalStorage(data.token);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, error => {
        this.loading = false;
        this.toastr.error(error.error.message, 'Error');
        this.login.reset();
      })
    }, 500);
  }

}
