import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';

//Interceptors
import { AddTokenInterceptor } from '../app/helpers/add-token.interceptor'

// Componentes
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { ClienteComponent } from './components/dashboard/Cliente/cliente.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NuevoClienteComponent } from './components/dashboard/cliente/nuevo-cliente/nuevo-cliente.component';
import { VerClienteComponent } from './components/dashboard/cliente/ver-cliente/ver-cliente.component';
import { ListaClientesComponent } from './components/dashboard/cliente/lista-clientes/lista-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CambiarPasswordComponent,
    ClienteComponent,
    NavbarComponent,
    LoadingComponent,
    NuevoClienteComponent,
    VerClienteComponent,
    ListaClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatSliderModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
