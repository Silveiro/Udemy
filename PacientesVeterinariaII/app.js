//Campos del formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

//UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;
//clases
class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }

}

class UI {

    imprimirAlerta(mensaje, tipo) {
        //crear el div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

        //agregar clase en base al tipo de error
        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        //mensaje de error
        divMensaje.textContent = mensaje;

        //agregar cita al DOM
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        //quitar alerta despues de 5 seb 

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
    imprimirCitas({ citas }) {

        this.limpiarHTML();

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title", "font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Propietario: </span> ${propietario}
            `;
            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Telefono: </span> ${telefono}
            `;
            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Telefono: </span> ${fecha}
            `;
            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Hora: </span> ${hora}
            `;
            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Sintomas: </span> ${sintomas}
            `;

            //boton para eliminar la cita
            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger", "mr-2");
            btnEliminar.innerHTML = `Eliminar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style="max-width: 20px;"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;
            btnEliminar.onclick = () => eliminarCita(id);

            // Boton para editar la cita
            const btnEdit = document.createElement("button");
            btnEdit.classList.add("btn", "btn-dark", "mr-2");
            btnEdit.innerHTML = `Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style="max-width: 20px;"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>`;
            btnEdit.onclick = () => editarCita(cita);


            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEdit);


            //agregar las citas al HTML 
            contenedorCitas.appendChild(divCita);
        })
    }


    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();



//Registrar eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener("input", datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horaInput.addEventListener("input", datosCita);
    sintomasInput.addEventListener("input", datosCita);

    formulario.addEventListener("submit", nuevaCita);
}

//objeto con la información de la cita 
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
}


//agrega datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

//valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    //extraer la información del objeto cita 
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //validar 
    if (mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta("todos los campos son obligatorios", "error");
        return;
    }
    if (editando){
        ui.imprimirAlerta("editado correctamente");

        //Pasar el objeto de la cita a edicion 
        administrarCitas.editarCita({...citaObj});

        // regresar el texto del boton al estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        //Quitar modo edición 
        editando = false;
        ui.imprimirCitas(administrarCitas);
    }else{
        administrarCitas.agregarCita({...citaObj});
        ui.imprimirCitas(administrarCitas);
    }
    citaObj.id = Date.now();    

    //reiniciar form 
    formulario.reset();
    reiniciarObjeto();

    
}


function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

function eliminarCita(id){
    //Eliminar la cita 
    administrarCitas.eliminarCita(id);
    //Muestre un mensaje
    ui.imprimirAlerta("la cita se eliminó correctamente");
    //refrescar las citas
    ui.imprimirCitas(administrarCitas);

}

function editarCita(cita){
    //Carfa lo datos en modo edicion
    const {mascota, propietario, telefono, fecha, hora, sintomas,id} = cita;

    //Llenar los inputs

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto 
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha; 
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    //cambiar el boton del formulario
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;
}