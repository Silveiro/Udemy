const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const registrosPorPagina = 30; 
let totalPaginas;
const paginacionDiv = document.querySelector("#paginacion");
let paginaActual = 1;




window.onload = () => {
    formulario.addEventListener("submit", validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();
    const terminoBusqueda = document.querySelector("#termino").value;
    if (terminoBusqueda === '') {
        mostrarAlerta("Agregar un termino de busqueda");
        return;
    } else {
        buscarImagenes(terminoBusqueda);
    }
}

function mostrarAlerta(mensaje) {
    const existeAlerta = document.querySelector(".bg-red-100");
    if (!existeAlerta) {
        const alerta = document.createElement("p");
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3",
            "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center");
        alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${mensaje}</span>
    `;
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }


}

function buscarImagenes() {
    const termino = document.querySelector("#termino").value;
    const key = "28567147-54652cfbd8fa7a5793d966c52";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;
    console.log(url);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            console.log(totalPaginas);
            mostrarImagenes(resultado.hits);
        })
        .catch(error => {
            console.log(error);
        })
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPorPagina));
}

function *crearPaginador(total){
    console.log(total);
    for(let i = 1; i<= total; i++){
        yield i;
    }
}

function mostrarImagenes(imagenes) {
    console.log(imagenes);
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);

    }
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;
        resultado.innerHTML += `
        <div class=" p-5 mb-4 ">
         <div class="bg-white p-1">
           <img class "w-full" src="${previewURL}">
           <div class "p-4">
             <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
             <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>
             <a
             class=" block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
              href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver imagen</a>

           </div>
           </div>
        
        </div>
        `;

    });
    //LimpiarPaginadorPrevio
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
    ImprimirPaginador();
}

function ImprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
    while(true){
        const {value,done} = iterador.next();
        if(done) return;

        //caso contrario genera un boton por cada elemento en el generador
        const boton = document.createElement("a");
        boton.href = "#";
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add("siguiente","bg-yellow-400", "px-4", "py-1", "mr-2", "font-bold", "mb-4", "uppercase", "rounded");

        boton.onclick = () => {
            paginaActual = value;
            buscarImagenes();
        }
        paginacionDiv.appendChild(boton);
    }
}