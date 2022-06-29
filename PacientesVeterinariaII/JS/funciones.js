import Citas from "./Classes/Citas.js";
import UI from "./Classes/UI.js";

import { mascotaInput,propietarioInput,telefonoInput,
    fechaInput,horaInput,sintomasInput,formulario } from "./selectores.js"; 

//clases

const ui = new UI();
const administrarCitas = new Citas();

let editando;

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
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}



//valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
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


export function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

export function eliminarCita(id){
    //Eliminar la cita 
    administrarCitas.eliminarCita(id);
    //Muestre un mensaje
    ui.imprimirAlerta("la cita se eliminó correctamente");
    //refrescar las citas
    ui.imprimirCitas(administrarCitas);

}

export function editarCita(cita){
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