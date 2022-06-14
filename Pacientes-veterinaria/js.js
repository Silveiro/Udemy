//const
const formulario = document.querySelector("#formulario");
const botonformulario = document.querySelector("#botonformulario");



//Event Listeners
eventListeners();

function eventListeners() {
    botonformulario.addEventListener("click", validarDatos);
}

//Clases

class Cita {
    constructor(nombreM, nombreP, hora, notas,celular, dia) {
        this.nombreM = nombreM;
        this.nombreP = nombreP;
        this.hora = hora;
        this.notas = notas;
        this.celular = celular;
        this.dia = dia;
    }
}



//Funciones
function validarDatos() {
    var nombreMascota = document.querySelector("#nombreMascota").value;
    var nombrePropietario = document.querySelector("#nombrePropietario").value;
    var hora = document.querySelector("#hora").value;
    var sintomas = document.querySelector("#sintomas").value;

    var telefono = document.querySelector("#telefono");
    var fecha = document.querySelector("#fecha");
    var fecha1 = new Date(fecha.value);
    var tel = Number(telefono.value);
    var x = new Date();
    var nuevaCita = new Cita(nombreMascota,nombrePropietario,hora,sintomas);

    

    if (tel === 0) {
        telefono.classList.add("red-border");
        alertar("Telefono NO valido");
        return("Telefono NO valido")
    } else {
        telefono.classList.remove("red-border");
        console.log("Telefono SI valido");
        nuevaCita.telefono = telefono;

    }

    if (fecha1 < x) {
        fecha.classList.add("red-border");
        alertar("Fecha NO valida");
        return("Fecha NO valida")
    } else {
        fecha.classList.remove("red-border");
        console.log("Fecha SI valida");
        nuevaCita.fecha1 = fecha1;

    }
    var nuevaCita = new Cita(nombreMascota,nombrePropietario,hora,sintomas,tel,fecha1);
    console.log(nuevaCita);
    formulario.reset();
}

//Alertar Errores
function alertar(mensaje) {
    document.querySelector("#alerta").classList.add("error");
    document.getElementById("alerta").innerHTML = mensaje;
    setTimeout(() => {
        document.querySelector("#alerta").classList.add("d-none");
    }, 3000);
}


