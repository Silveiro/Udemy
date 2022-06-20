//const
const formulario = document.querySelector("#formulario");
const botonformulario = document.querySelector("#botonformulario");

var arrcitas = [];

//Event Listeners
eventListeners();

function eventListeners() {
    botonformulario.addEventListener("click", validarDatos);
}

//Clases

class Cita {
    constructor(id, nombreM, nombreP, hora, notas, celular, dia) {
        this.id = id;
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
    var y = new Date();
    var yy = y.getTime();
    var nuevaCita = new Cita(yy, nombreMascota, nombrePropietario, hora, sintomas);



    if (tel === 0) {
        telefono.classList.add("red-border");
        alertar("Telefono NO valido");
        return ("Telefono NO valido")
    } else {
        telefono.classList.remove("red-border");
        console.log("Telefono SI valido");
        nuevaCita.telefono = telefono;

    }

    if (fecha1 < x) {
        fecha.classList.add("red-border");
        alertar("Fecha NO valida");
        return ("Fecha NO valida")
    } else {
        fecha.classList.remove("red-border");
        console.log("Fecha SI valida");
        nuevaCita.fecha1 = fecha1;

    }
    var nuevaCita = new Cita(yy, nombreMascota, nombrePropietario, hora, sintomas, tel, fecha1);
    arrcitas.push(nuevaCita);
    console.log(arrcitas);
    mostrarCitas(arrcitas);
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

function mostrarCitas(arreglo) {
    const para = document.createElement("div");

    for (var i = 0; i < arreglo.length; i++) {
        console.log(i);
        while (para.firstChild) {
            para.removeChild(para.firstChild);
        }
        para.innerHTML = "<p>" + arreglo[i].id + "</p>" + "<p>" + arreglo[i].nombreM + "</p>" + "<p>" + arreglo[i].nombreP + "</p>" + "<p>" + "+" + arreglo[i].celular + "</p>" + "<p>" + arreglo[i].dia + "</p>" + arreglo[i].hora + "<p>" + arreglo[i].notas + "</p>" + "<button id=\"botonEliminar\">" + "Eliminar" + "</button>";
        document.getElementById("der").appendChild(para);
        const botonEliminar = document.querySelector("#botonEliminar");
        botonEliminar.addEventListener("click", eliminarCitas);

    }
    function eliminarCitas() {
        console.log(para);
    }

}

        
        


