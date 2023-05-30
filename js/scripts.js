import { Propiedad } from "./propiedad.js";
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
  formulario.txtTitulo.value = elemento.titulo;
  formulario.rdoTransaccion.value = elemento.transaccion;
  formulario.txtDescripcion.value = elemento.descripcion;
  formulario.nmbPrecio.value = elemento.precio;
  formulario.nmbBanios.value = elemento.numBanios;
  formulario.nmbAutos.value = elemento.numAutos;
  formulario.nmbDormitorios.value = elemento.numDormitorios;
}

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Desestructuracion de formulario
  const {
    txtId,
    txtTitulo,
    rdoTransaccion,
    txtDescripcion,
    nmbPrecio,
    nmbBanios,
    nmbAutos,
    nmbDormitorios,
  } = $formulario;
  // Validaciones
  if (
    !(
      validarString(txtTitulo.value) &&
      validarOpciones(rdoTransaccion.value, "Venta", "Alquiler") &&
      validarString(txtDescripcion.value) &&
      validarRango(nmbPrecio.value, 0, 999999999) &&
      validarRango(nmbBanios.value, 1, 5) &&
      validarRango(nmbAutos.value, 0, 5) &&
      validarRango(nmbDormitorios.value, 1, 12)
    )
  ) {
    // console.log("Datos correctos");
    document.getElementById("mensaje-formulario").textContent =
      "Se han ingresado datos inválidos.";
  } else {
    document.getElementById("mensaje-formulario").textContent =
      "";
    // ABM
    if (txtId.value === "") {
      console.log("Alta de elemento..");
      const newElement = new Propiedad(
        Date.now(),
        txtTitulo.value,
        rdoTransaccion.value,
        txtDescripcion.value,
        parseInt(nmbPrecio.value),
        parseInt(nmbBanios.value),
        parseInt(nmbAutos.value),
        parseInt(nmbDormitorios.value)
      );
      handlerCreate(array, newElement, $tabla);
    } else {
      console.log("Actualización de elemento..");
      const editElement = new Propiedad(
        parseInt(txtId.value),
        txtTitulo.value,
        rdoTransaccion.value,
        txtDescripcion.value,
        parseInt(nmbPrecio.value),
        parseInt(nmbBanios.value),
        parseInt(nmbAutos.value),
        parseInt(nmbDormitorios.value)
      );
      handlerUpdate(array, editElement, $tabla);
    }
    $formulario.reset();
  }
  //   console.log("Titulo", txtTitulo.value);
  //   console.log("ID", txtId.value);
  //   console.log("Transaccion", rdoTransaccion.value);
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
  $formulario.txtId.value = -1;
  $formulario.reset();
  $btnEliminar.disabled = true;
  $btnGuardar.value = "Guardar";
});
