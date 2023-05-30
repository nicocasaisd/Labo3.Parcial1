import { SuperHeroe } from "./superheroe.js";
import {
  handlerCreate,
  handlerUpdate,
  actualizarStorage,
  handlerDelete,
} from "./manejadores.js";
import {
  validarString,
  validarRango,
  validarOpciones,
} from "./validaciones.js";
import { actualizarTabla } from "./tabla.js";


// Opciones

const armas_const = ["Armadura","Espada", "Martillo", "Escudo", "Arma de fuego","Flechas"];
actualizarStorage("armas", armas_const);

const $lista = document.getElementById("select-arma");
const armas = JSON.parse(localStorage.getItem("armas")) || [];

armas.forEach( (el, index) => {
  // console.log(el);
  let option = document.createElement("option");
  option.textContent = el;
  option.value = index+1;
  $lista.appendChild(option);
});
// Obtengo punteros

const $formulario = document.forms[0];
const $tabla = document.getElementById("tabla");
const array = JSON.parse(localStorage.getItem("array")) || [];

// Botones
const $btnGuardar = document.getElementById("btnGuardar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

// Mensaje
// $mensajeFormulario = document.getElementById("mensaje-formulario")

console.log(array);
if (array.length > 0) actualizarTabla($tabla, array);

// WINDOW CLICK
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.getAttribute("data-id");
    const selectedElement = array.find((el) => el.id == id);
    cargarElementoEnFormulario($formulario, selectedElement);
    $btnEliminar.disabled = false;
    $btnGuardar.value = "Modificar";

    console.log(selectedElement);
  }
});

// console.log($formulario);
// $formulario.txtId.value = "12";

function cargarElementoEnFormulario(formulario, elemento) {
  formulario.txtId.value = elemento.id;
  formulario.txtNombre.value = elemento.nombre;
  formulario.rdoEditorial.value = elemento.editorial;
  formulario.txtAlias.value = elemento.alias;
  formulario.rdoFuerza.value = elemento.fuerza;
  formulario.lstArma.value = elemento.arma;
}

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Desestructuracion de formulario
  const {
    txtId,
    txtNombre,
    txtAlias,
    rdoEditorial,
    rdoFuerza,
    lstArma
  } = $formulario;
  // Validaciones
console.log("Validacion");
  console.log(txtNombre.value, txtAlias.value, rdoEditorial.value, rdoFuerza.value, lstArma.value)
  if (
    !(
      validarString(txtNombre.value) &&
      validarOpciones(rdoEditorial.value, "Marvel", "DC") &&
      validarString(txtAlias.value) &&
      validarRango(rdoFuerza.value, 0, 100) &&
      validarRango(lstArma.value, 1, armas.length)

    )
  ) {
    document.getElementById("mensaje-formulario").textContent =
      "Se han ingresado datos inválidos.";
  } else {
    document.getElementById("mensaje-formulario").textContent =
      "";
    // ABM
    // console.log(txtId.value);
    if (txtId.value === "") {
      console.log("Alta de elemento..");
      const newElement = new SuperHeroe(
        Date.now(),
        txtNombre.value,
        txtAlias.value,
        rdoEditorial.value,
        parseInt(rdoFuerza.value),
        parseInt(lstArma.value),
      );
      handlerCreate(array, newElement, $tabla);
    } else {
      console.log("Actualización de elemento..");
      const editElement = new SuperHeroe(
        parseInt(txtId.value),
        txtNombre.value,
        txtAlias.value,
        rdoEditorial.value,
        parseInt(rdoFuerza.value),
        parseInt(lstArma.value),
      );
      handlerUpdate(array, editElement, $tabla);
    }
    $formulario.reset();
  }
  //   console.log("nombre", txtNombre.value);
  //   console.log("ID", txtId.value);
  //   console.log("Transaccion", rdoEditorial.value);
  //   console.log("Dormitorios", nmbDormitorios.value);
});

$btnEliminar.addEventListener("click", (e) => {
  if (confirm("Desea eliminar el elemento?")) {
    console.log("Eliminar...");
    handlerDelete(parseInt($formulario.txtId.value), array, $tabla);
    $formulario.reset();
  }
});

$btnCancelar.addEventListener("click", (e) => {
  console.log("Cancelando...");
  document.getElementById("mensaje-formulario").textContent = "";
  $formulario.txtId.value = "";
  $formulario.reset();
  $btnEliminar.disabled = true;
  $btnGuardar.value = "Guardar";
});
