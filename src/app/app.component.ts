import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  tittle= ""
  listaDeEstudiantes: any[] = [
    {nombre: 'Julian Sosa', estado: 'Promocionado'},
    {nombre: 'Javier Molina', estado: 'Desaprobado'},
    {nombre: 'Lucia Nieves', estado: 'Regulariza'},

  ]

  mostrar = true;
  toogle(): void {
    this.mostrar = !this.mostrar
  } 
}
