import {eliminarCita, editarCita} from "../funciones.js";
import {contenedorCitas} from "../selectores.js";

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

export default UI;