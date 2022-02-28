import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { ClienteComponent } from './components/dashboard/Cliente/cliente.component';
import { NuevoClienteComponent } from './components/dashboard/cliente/nuevo-cliente/nuevo-cliente.component';
import { ListaClientesComponent } from './components/dashboard/cliente/lista-clientes/lista-clientes.component';
import { VerClienteComponent } from './components/dashboard/cliente/ver-cliente/ver-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio', component: InicioComponent, children: [
      { path: '', component: BienvenidaComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }]
    },
      { path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: ClienteComponent, },
      { path: 'ver-cliente/:id', component: VerClienteComponent },
      { path: 'lista-clientes', component: ListaClientesComponent },
      { path: 'cambiar-password', component: CambiarPasswordComponent },
      { path: 'nuevo-cliente', component: NuevoClienteComponent }
    ]
  },

  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
