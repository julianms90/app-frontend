import { DatosAdicionales } from './datosAdicionales';
export class Cliente {
    id: number;
    nombreCompleto: string;
    identificacion: string;
    edad: number;
    genero: string;
    estado: boolean;
    maneja: boolean;
    usaLentes: boolean;
    diabetico: boolean;
    enfermedad: string;
    datosAdicionales: DatosAdicionales[];

    constructor(
        nombreCompleto: string,
        identificacion: string,
        edad: number,
        genero: string,
        estado: boolean,
        maneja: boolean,
        usaLentes: boolean,
        diabetico: boolean,
        enfermedad: string,
        datosAdicionales: DatosAdicionales[],
    ) {
        this.nombreCompleto = nombreCompleto;
        this.identificacion = identificacion;
        this.edad = edad;
        this.genero = genero;
        this.estado = estado;
        this.maneja = maneja;
        this.usaLentes = usaLentes;
        this.diabetico = diabetico;
        this.enfermedad = enfermedad;
        this.datosAdicionales = datosAdicionales;
    }
}