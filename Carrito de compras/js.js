//cuando alguien pinche el carrito se muestre el contenido
var imagenCarrito = document.getElementById("imagenCarrito");
imagenCarrito.addEventListener("click", ocultar);
function ocultar() {
    var dropdown = document.getElementById("carrito");
    if (dropdown.style.display == "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}


const listaCursos = document.querySelector("#cursos");
const carrito = document.querySelector("#carrito");
cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);
    //Elimina cursos del carrito 
    carrito.addEventListener("click", eliminarCurso);
    //muestra los cursos de localStorage
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML();
   
    } )

}

function agregarCurso(e) {
    e.preventDefault();
    const cursoSeleccionado = e.target.parentElement.parentElement;

    if (e.target.classList.contains("agregar-carrito")) {
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if (e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("id");
        //Elimina del arreglo el articulosCarrito por el id 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}






let articulosCarrito = [];
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
//lee el contenido del HTML al que le dimos click y extrae info del curso

function leerDatosCurso(curso) {
    console.log(curso);
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h2").textContent,
        id: curso.querySelector("button").getAttribute("id"),
        cantidad: 1,
    }

    // revisa si un elemento ya existe 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;  //retorna el objeto actualizado
            } else {
                return curso; //retorna los demas 
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos al arreglo de carrito 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



//agrega articulos al carrito
console.log(articulosCarrito);
carritoHTML();
}

//muestra el carrito de compras en el HTML
function carritoHTML() {
    //limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${curso.imagen}"></td>
        
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" id="${curso.id}" > x</a></td>
        `;
        // agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })
    // sincrionizar con storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));  
}

function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}


//vaciar el carrito de compras 
const bottonVaciarCarrito = document.getElementById("vaciar-carrito");
bottonVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
articulosCarrito = [];
carritoHTML();
}