export class Anuncio
{
    constructor(id, titulo, transaccion, descripcion, precio)
    {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_Auto extends Anuncio
{
    constructor(id, titulo, transaccion, descripcion, precio, numBanios, numDormitorios, numAutos)
    {
        super(id, titulo, transaccion, descripcion, precio);
        this.numBanios = numBanios;
        this.numDormitorios = numDormitorios;
        this.numAutos = numAutos;
    }
}