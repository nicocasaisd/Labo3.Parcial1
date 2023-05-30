import {Anuncio_Auto} from "./Anuncio.js";


const $anuncios = document.getElementById("anuncios");
const array = JSON.parse(localStorage.getItem("array")) || [];

// console.log(array);

array.forEach( (el, index) => {
    // console.log(el);
    let anuncio = new Anuncio_Auto(el.id, el.titulo, el.transaccion, el.descripcion, el.precio, el.numBanios, el.numDormitorios, el.numAutos);
    $anuncios.appendChild(generarArticulo(anuncio));
    console.log(index);
});

function generarArticulo(anuncio)
{
    const article = document.createElement("article");

    console.log(anuncio);
    // Titulos
    const titulo = document.createElement("h2");
    // console.log(anuncio.titulo);
    titulo.textContent = anuncio.titulo;
    article.appendChild(titulo);

    // Descripcion
    const descripcion = document.createElement("p");
    descripcion.textContent = anuncio.descripcion;
    article.appendChild(descripcion);

    // Precio
    const precio = document.createElement("p");
    precio.textContent = "U$S " + anuncio.precio;
    article.appendChild(precio);

    //Baños
    const numBanios = document.createElement("p");
    numBanios.textContent = anuncio.numBanios;
    // Icono
    numBanios.appendChild(crearIcono(' <i class="fa-regular fa-compass"></i>'));
    
    article.appendChild(numBanios);

    //Autos
    const numAutos = document.createElement("p");
    numAutos.textContent = anuncio.numAutos;
    // Icono
    numAutos.appendChild(crearIcono(' <i class="fa-regular fa-user"></i>'));
    
    article.appendChild(numAutos);

    // Boton
    // const boton = document.createElement("button");
    // boton.textContent = "Ver Objeto";
    article.appendChild(crearBoton("Ver Objeto"));

    // console.log(article);

    return article;

}

function crearIcono(innerHTML)
{
    const icono = document.createElement("i");
    icono.innerHTML = innerHTML;

    return icono;
}

function crearBoton(text)
{
    const boton = document.createElement("button");
    boton.textContent = text;

    return boton;
}