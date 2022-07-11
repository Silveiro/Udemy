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

window.addEventListener("DOMContentLoaded", crearDB);
let DB;
function crearDB() {
    //crear la BBDD en version 1.0
    const crearDB = window.indexedDB.open("citas", 1);
    //Si hay un error
    crearDB.onerror = function () {
        console.log("Hubo un error");
    }
    //Si todo sale bien 
    crearDB.onsuccess = function () {
        console.log("Todo salió bien");
        DB = crearDB.result;
        console.log(DB);
    }


    //Definir el Schema
    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const ObjectStore = db.createObjectStore("citas", {
            keyPath: "id",
            autoincrement: true,
        });

        //Definir todas las columnas
        ObjectStore.createIndex("mascota", "mascota", {unique: false});
        ObjectStore.createIndex("propietario", "propietario", {unique: false});
        ObjectStore.createIndex("telefono", "telefono", {unique: false});
        ObjectStore.createIndex("fecha", "fecha", {unique: false});
        ObjectStore.createIndex("hora", "hora", {unique: false});
        ObjectStore.createIndex("sintomas", "sintomas", {unique: false});
        ObjectStore.createIndex("id", "id", {unique: true});

        console.log("DataBase Creada y lista")
    }
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
        //Nuevo registro

        citaObj.id = Date.now(); 

        administrarCitas.agregarCita({...citaObj});
        ui.imprimirCitas(administrarCitas);
        //insertar registro en IndexedDB
        
        const transaction = DB.transaction(["citas"], "readwrite");
        const objectStore = transaction.objectStore("citas");
        objectStore.add(citaObj);
        transaction.oncomplete = function(){
            console.log("Cita Agregada");
        }

    }


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