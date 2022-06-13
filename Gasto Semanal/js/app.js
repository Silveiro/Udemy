// variables y selectores 
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");




// Eventos 
eventlisteners();
function eventlisteners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener("submit", agregarGasto);
}

//clases 

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
        this.calcularRestante();
    }
    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        console.log(this.gastos);
        this.calcularRestante();
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        //Extraer el valor 
        const { presupuesto, restante } = cantidad;
        //Insertar en el HTML 
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    };
    imprimirAlerta(mensaje, tipo) {
        //crear el div 
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");

        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success")
        }
        //mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el HTML 
        document.querySelector(".primario").insertBefore(divMensaje, formulario);
        //Qutar del HTML 
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }
    mostrarGastos(gastos) {
        //Limpiar el HTML 
        this.limpiarHTML();

        //iterar sobre los gastos
        gastos.forEach(gasto => {
            const { cantidad, nombre, id } = gasto;

            //Crear un LI
            const nuevoGasto = document.createElement("li");
            nuevoGasto.className = "list-group-item d-flex justify-content-between align-items-center";
            nuevoGasto.setAttribute("data-id", id);

            console.log(nuevoGasto);

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre}<span class 'badge badge-primary badge-pill'>${cantidad}</span>`;



            //Boton para borrar el gasto
            const btnBorrar = document.createElement("button");
            btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
            btnBorrar.innerHTML = "Borrar &times";
            nuevoGasto.appendChild(btnBorrar);
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }

            //Agregar al HTML 
            gastoListado.appendChild(nuevoGasto);


        });
    }


    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
    actualizarRestante(restante) {
        document.querySelector("#restante").textContent = restante;

    }
    comprobarPresupuesto(presupuestoobj) {
        const { presupuesto, restante } = presupuestoobj;
        const restanteDiv = document.querySelector(".restante");
        //comprobar25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove("alert-success", "alert-warning");
            restanteDiv.classList.add("alert-danger");
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove("alert-success");
            restanteDiv.classList.add("alert-warning");
        }else{
            restanteDiv.classList.remove("alert-warning","alert-danger");
            restanteDiv.classList.add("alert-success");

        }
        //comprobar si se agoto el PPTO 
        if (restante <= 0) {
            this.imprimirAlerta("El presupuesto se agotó", "error");
            formulario.querySelector('button[type="submit"]').disabled = true;
        }else{
            formulario.querySelector('button[type="submit"]').disabled = false;
        }
    }
}

    //Instancear

    const ui = new UI();
let presupuesto;

//funciones 




function preguntarPresupuesto() {
    var presupuestoUsuario = prompt('¿Cual es tu presupuesto?')
    console.log(Number(presupuestoUsuario));
    if (isNaN(presupuestoUsuario) || presupuestoUsuario === "" || presupuestoUsuario === null || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);

    //validar 
    if (nombre === "" || cantidad === "") {
        ui.imprimirAlerta("ambos campos son obligatorios", "error");
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no valida", "error");
        return;
    }
    //Generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() };

    //añade un nuevo gasto 
    presupuesto.nuevoGasto(gasto);
    console.log(presupuesto);
    //mensaje agregado correctamente
    ui.imprimirAlerta("gasto agregado crrectamente");
    //Imprimir los gastos
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);


    //Reinicia el Formulario
    formulario.reset();

}

function eliminarGasto(id){
    //Elimina del Objeto
    presupuesto.eliminarGasto(id);
    //Elimina del HTML
    const {gastos,restante} = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}

