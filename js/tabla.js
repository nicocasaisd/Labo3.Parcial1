export const crearTabla = (data) => {
  if (!Array.isArray(data)) return null;

  const tabla = document.createElement("table");

  tabla.appendChild(crearCabecera(data[0]));
  tabla.appendChild(crearCuerpo(data));

  return tabla;
};

export function actualizarTabla(contenedor, data) {
  // Elimino todos los nodos hijos del contenedor
  while (contenedor.firstElementChild) {
    contenedor.removeChild(contenedor.firstElementChild);
  }
  // Agregar la data
  document.getElementById("spinner").hidden = false;
  setTimeout(() => {
    console.log("Delay 2000ms");
    contenedor.appendChild(crearTabla(data));
    document.getElementById("spinner").hidden = true;
  }, 2000);
}

const crearCabecera = (elemento) => {
  const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");
  headRow.style.setProperty("background-color", "#6D3B47");

  for (const key in elemento) {
    let heading = key;

    switch (key) {
      case "id":
        continue;
        break;
/*       case "numBanios":
        heading = "Cantidad de Baños";
        break;
        case "numAutos":
        heading = "Espacio en cochera";
        break;
        case "numDormitorios":
        heading = "Cantidad de Dormitorios";
        break; */
      default:
        break;
    }
    const th = document.createElement("th");
    th.textContent = heading;
    headRow.appendChild(th);
  }

  tHead.appendChild(headRow);

  return tHead;
};

const crearCuerpo = (data) => {
  if (!Array.isArray(data)) return null;
  const tBody = document.createElement("tbody");

  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.dataset.id = element[key];
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];

        tr.appendChild(td);
      }
    }
    tBody.appendChild(tr);
  });

  return tBody;
};
