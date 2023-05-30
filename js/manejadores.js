import { actualizarTabla } from "./tabla.js";

export function handlerCreate(array, nuevoElemento, contenedor) {
  array.push(nuevoElemento);
  actualizarStorage("array", array);
  actualizarTabla(contenedor, array);
}
export function handlerUpdate(array, editElemento, contenedor) {
  let index = array.findIndex((el) => el.id == editElemento.id);

  array.splice(index, 1, editElemento);

  actualizarStorage("array", array);
  actualizarTabla(contenedor, array);
}

export function handlerDelete(id, array, contenedor) {
    // console.log("id",id);
  let index = array.findIndex((el) => el.id == id);
//   console.log("index",index);
  if(index > -1)
  {
      array.splice(index, 1);
      actualizarStorage("array", array);
      actualizarTabla(contenedor, array);
  }
}

export function actualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}
