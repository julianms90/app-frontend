export class DatosAdicionales{
    id?: number;
    descripcion: string;
    estado: boolean;
    clienteId: number;

    constructor(descripcion: string, estado: boolean, clienteId: number, id?: number){
        this.id = id;
        this.descripcion = descripcion;
        this.estado = estado;
        this.clienteId = clienteId;
    }
}
