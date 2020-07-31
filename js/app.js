// Variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
// Listener

cargarEventListener();

function cargarEventListener() {
  // Dispara cuando se presiona  "Agregar al carrito"
  cursos.addEventListener("click", comprarCurso);
  // Cuando se elimina un curso del carrit
  carrito.addEventListener("click", eliminarCurso);
  // Para vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciasCarrito);
  // Al cargar el documento mostrar LS
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // Delegation para agregar carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    // Enviamos el curso selecionada para tomar sus datos
    leerDatosCurso(curso);
  }
}

// Lee los datos del curso

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };

  insertarCarrito(infoCurso);
}

// Muestra el curso selecionado en el carrito

function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
         <td>  
              <img src="${curso.imagen}" width=100>
         </td>
         <td>${curso.titulo}</td>
         <td>${curso.precio}</td>
         <td>
              <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
         </td>
    `;
  listaCursos.appendChild(row);

  guardarCursoLocalStorage(curso);
}
// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();

  let curso;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCursoLocalStorage(cursoId);
}
// Elimina todos los cursos del carrito en el DOM
function vaciasCarrito() {
  // Forma lenta
  /* listaCursos.innerHTML = '' */
  // Forma recomendada
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }


  //Vaciar Local Storage
  vaciarLocalStorage();
  return false;
}

// Almacena cursos del carrito al LS
function guardarCursoLocalStorage(curso) {
  let cursos;
  // cursos toma el valor de un array de los cursos en LS
  cursos = obtenerCursosLocalStorage();
  // El Curso selecionado se agrega al array
  cursos.push(curso);

  localStorage.setItem("cursos", JSON.stringify(cursos));
}

//Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
  let cursosLS;
  //Comprobamos si hay algo en el LS
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }

  return cursosLS;
}

//Imprime los cursos de LocalStorage en el carrito

function leerLocalStorage() {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function (curso) {
    // constrir el template
    const row = document.createElement("tr");
    row.innerHTML = `
             <td>  
                  <img src="${curso.imagen}" width=100>
             </td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>
                  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
             </td>
        `;
    listaCursos.appendChild(row);
  });
}

// Elimina el curso en el Local Storage por el ID

function eliminarCursoLocalStorage(curso) {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach(function (cursoLS, i) {
    if (cursosLS.id === curso) {
      cursosLS.splice(i, 1);
    }
  });
  localStorage.setItem("cursos", JSON.stringify(cursosLS));
}

// Elimina todos los cursos de local storage

function vaciarLocalStorage() {
  localStorage.clear();
}
