export class Personaje {
  
    constructor(id, nombre, fuerza) {
    this.id = id;
    this.nombre = nombre;
    this.fuerza = fuerza;
  }
}

/* function Personaje(id, nombre, alias, editorial, fuerza, arma) {
  this.id = id;
  this.nombre = nombre;
  this.alias = alias;
  this.editorial = editorial;
  this.fuerza = fuerza;
  this.arma = arma;
} */

export class SuperHeroe extends Personaje {
  constructor(id, nombre, alias, editorial, fuerza, arma) {
    super(id, nombre, fuerza);
    this.alias = alias;
    this.editorial = editorial;
    this.arma = arma;
  }
}

