import {SuperHeroe} from "./clases.js";


const $superheroes = document.getElementById("superheroes");
const array = JSON.parse(localStorage.getItem("array")) || [];
const armas = JSON.parse(localStorage.getItem("armas"))

console.log(array);

document.getElementById("spinner").hidden = false;

setTimeout( () => {
  console.log("Delay 2000ms");
  crearTodos(array)

  document.getElementById("spinner").hidden = true;
}, 2000
);

;
function crearTodos(array)
{

    array.forEach( (el, index) => {
        // console.log(el);
        let superheroe = new SuperHeroe(el.id, el.nombre, el.alias, el.editorial, el.fuerza, el.arma);
        $superheroes.appendChild(generarArticulo(superheroe));
        console.log(index);
});

}
function generarArticulo(superheroe)
{
    const article = document.createElement("article");

    console.log(superheroe);
    // nombres
    const nombre = document.createElement("h2");
    // console.log(superheroe.nombre);
    nombre.textContent = superheroe.nombre;
    article.appendChild(nombre);

    // alias
    const alias = document.createElement("p");
    alias.textContent = superheroe.alias;
    article.appendChild(alias);

    // editorial
    const editorial = document.createElement("p");
    editorial.textContent = superheroe.editorial;
    article.appendChild(editorial);
    // Icono
    editorial.appendChild(crearIcono(' <i class="fa-solid fa-book"></i>'));

    //Baños
    const fuerza = document.createElement("p");
    fuerza.textContent = superheroe.fuerza;
    // Icono
    fuerza.appendChild(crearIcono(' <i class="fa-solid fa-dumbbell"></i>'));
    
    
    article.appendChild(fuerza);

    //Autos
    const arma = document.createElement("p");

    arma.textContent = armas[superheroe.arma-1];
    // Icono
    arma.appendChild(crearIcono(' <i class="fa-regular fa-compass"></i>'));
    
    article.appendChild(arma);

    // console.log(article);

    return article;

}

function crearIcono(innerHTML)
{
    const icono = document.createElement("i");
    icono.innerHTML = innerHTML;

    return icono;
}
