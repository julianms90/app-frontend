import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario: string;
  constructor(private loginService: LoginService,
    private router: Router) { 
      
    }

  ngOnInit(): void {
    this.getNombreUsuario();
  }

  getNombreUsuario(): void{
    // console.log(this.loginService.getTokenDecoded());
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
  }

  LogOut(): void{
    this.loginService.removeNombreUsuario();
    this.router.navigate(['/inicio'])
  }
}
