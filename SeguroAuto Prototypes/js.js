function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//realiza la cotizacion con los datos 
Seguro.prototype.cotizarSeguro = function () {
    /*
    1 = Americano > 1,15
    2 = Asiatico >1.05
    3 = Europeo > 1.35
    */
    let cantidad;
    const base = 2000;

    console.log(this.marca);
    switch (this.marca) {
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    //leer el año 
    const diferencia = new Date().getFullYear() - this.year;

    //cada año que la diferencia sea mayor el costo se reduce 3%
    cantidad -= ((diferencia * 3) * cantidad)/100;

    //Si el seguro es basico se multiplica por 30% mas 
    //Si el seguro es completo se multiplica por 50% mas

    if(this.tipo ==="basico"){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }



    return cantidad;
}

function UI() { }



UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement("div");
    if (tipo === "error") {
        div.classList.add("mensaje", "error");
    } else {
        div.classList.add("mensaje", "correcto");
    }
    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;

    // insertar en el HTML 
    const formulario = document.getElementById("cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = (seguro, total) => {
    const div = document.createElement("div");
    div.classList.add("mt-10");

    div.innerHTML = `
    <p class="header"> Tu Resumen</p>
    <p class="font-bold"> Total: $ ${total}</p>
    `;
    const resultadoDiv = document.querySelector("#resultado");

    //Mostrar el spinner 
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display= "none"; //se borra el spinner
        resultadoDiv.appendChild(div); //se muestra el resultado

    }, 3000);

}




const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})


eventlisteners();
function eventlisteners() {
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();


    // leer la marca seleccionada 
    const marca = document.querySelector("#marca").value;

    //leer el año seleccionado
    const year = document.querySelector("#year").value;

    //leer el tipo de cobertura
    const tipo = document.querySelector("input[name='tipo']:checked").value;

    if (marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje("Todos los campos son obligatoriosss", "error");
        return;
    }
    ui.mostrarMensaje("Cotizando", "exito");

    const resultados = document.querySelector("#resultado div");
    if(resultados != null){
        resultados.remove();
        }
    //instancear el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro, total);
}


