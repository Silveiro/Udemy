let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: "comida",
    2: "bebidas",
    3: "postres"
}


const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente() {
    //verificar si ya hay una alerta
    const mesa = document.querySelector("#mesa").value;
    const hora = document.querySelector("#hora").value;

    //revisa sihay campos vacios 
    const camposVacios = [mesa, hora].some(campo => campo === "");
    if (camposVacios) {
        const existeAlerta = document.querySelector(".invalid-feedback");
        if (!existeAlerta) {
            const alerta = document.createElement("div");
            alerta.classList.add("invalid-feedback", "d-block", "text-center");
            alerta.textContent = "Todos los campos son obligatorios";
            document.querySelector(".modal-body form").appendChild(alerta);
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    cliente = { ...cliente, mesa, hora }

    const modalFormulario = document.querySelector("#formulario");
    const modalBoostrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBoostrap.hide();
    console.log(cliente);

    // mostrar las secciones 
    mostrarSecciones();
    //obtener platillos de la appi de json server
    obtenerPlatillos();
}
function mostrarSecciones() {
    const seccionsOcultas = document.querySelectorAll(".d-none");
    seccionsOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}
function obtenerPlatillos() {
    const url = "http://localhost:4000/platillos";
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error));
}
function mostrarPlatillos(platillos) {
    const contenido = document.querySelector("#platillos .contenido");
    platillos.forEach(platillo => {
        const row = document.createElement("div");
        row.classList.add("row", "py-3", "border-top");

        const nombre = document.createElement("div");
        nombre.classList.add("col-md-4")
        nombre.textContent = platillo.nombre;

        const precio = document.createElement("div");
        precio.classList.add("col-md-3", "fw-bold");
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement("div");
        categoria.classList.add("col-md-3");
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add("form-control");

        //función que detecta la cantidad y platillo que se agrega
        inputCantidad.onchange = function () {
            const cantidad = parseInt(inputCantidad.value);
            agregarPlatillo({ ...platillo, cantidad });
        }



        const agregar = document.createElement("div");
        agregar.classList.add("col-md-2");
        agregar.appendChild(inputCantidad);



        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);
        contenido.appendChild(row);
    })
}

function agregarPlatillo(producto) {
    //Extraer el pedido actual
    let { pedido } = cliente;

    //revisar que la cantidad sea mayor a cero
    if (producto.cantidad > 0) {
        if (pedido.some(articulo => articulo.id === producto.id)) {
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });
            cliente.pedido = [...pedidoActualizado];
        } else {
            cliente.pedido = [...pedido, producto];
        }

    } else {
        const resultado = pedido.filter(articulo => articulo.id !== producto.id)
        cliente.pedido = [...resultado];
    }

    limpiarHTML();

    if (cliente.pedido.length) {
        actualizarResumen();
    } else {
        mensajePedidoVacio();
    }

}

function actualizarResumen() {
    const contenido = document.querySelector("#resumen .contenido");

    const resumen = document.createElement("div");
    resumen.classList.add("col-md-6", "card", "py-5", "px-3", "shadow");

    const mesa = document.createElement("p");
    mesa.textContent = "Mesa: ";
    mesa.classList.add("fw-bold");

    const mesaSpan = document.createElement("span");
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add("fw-normal");


    const hora = document.createElement("p");
    hora.textContent = "Hora: ";
    hora.classList.add("fw-bold");

    const horaSpan = document.createElement("span");
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add("fw-normal");

    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    const heading = document.createElement("H3");
    heading.textContent = "Platillos Consumidos";
    heading.classList.add("my-4", "text-center");
    //iterar sobre el array de pedidos
    const grupo = document.createElement("ul");
    grupo.classList.add("list-group");

    const { pedido } = cliente;
    pedido.forEach(articulo => {
        const { nombre, cantidad, precio, id } = articulo;

        const lista = document.createElement("li");
        lista.classList.add("list-group-item");

        const nombreEL = document.createElement("h4");
        nombreEL.classList.add("my-4");
        nombreEL.textContent = nombre;

        //Cantidad del articulo
        const cantidadEl = document.createElement("p");
        cantidadEl.classList.add("fw-bold");
        cantidadEl.textContent = "Cantidad: ";
        const cantidadValor = document.createElement("span");
        cantidadValor.classList.add("fw-normal");
        cantidadValor.textContent = cantidad;
        //Precio del articulo
        const precioEl = document.createElement("p");
        precioEl.classList.add("fw-bold");
        precioEl.textContent = "Precio: ";
        const precioValor = document.createElement("span");
        precioValor.classList.add("fw-normal");
        precioValor.textContent = `$${precio}`;

        //Subtotal del articulo
        const subtotalEl = document.createElement("p");
        subtotalEl.classList.add("fw-bold");
        subtotalEl.textContent = "Subtotal: ";
        const subtotalValor = document.createElement("span");
        subtotalValor.classList.add("fw-normal");
        subtotalValor.textContent = "$" + precio * cantidad;

        //BOTON elimiar
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.textContent = "Eliminar del pedido";
        //function para eliminar del pedido
        btnEliminar.onclick = function () {
            eliminarProducto(id);
        }

        //agregar valores a sus contenedores
        cantidadEl.appendChild(cantidadValor);
        precioEl.appendChild(precioValor);
        subtotalEl.appendChild(subtotalValor);


        //agregar elementos a LI 
        lista.appendChild(nombreEL);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subtotalEl);
        lista.appendChild(btnEliminar);

        //Agregar lista al grupo principal
        grupo.appendChild(lista);
    })

    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(heading);
    resumen.appendChild(grupo);


    contenido.appendChild(resumen);

    formularioPropinas();
}

function limpiarHTML() {
    const contenido = document.querySelector("#resumen .contenido")

    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild);
    }
}

function eliminarProducto(id) {
    const { pedido } = cliente;
    const resultado = pedido.filter(articulo => articulo.id !== id)
    cliente.pedido = [...resultado];
    console.log(cliente.pedido);

    limpiarHTML();

    if (cliente.pedido.length) {
        actualizarResumen();
    } else {
        mensajePedidoVacio();
    }

    //el producto se elimino, por lo tanto regresamos la cantidad a 0 en el formulario
    const productoEliminado = `#producto-${id}`;
    const inputEliminado = document.querySelector(productoEliminado);
    inputEliminado.value = 0 ; 
}

function mensajePedidoVacio() {
    const contenido = document.querySelector("#resumen .contenido");
    const texto = document.createElement("p");
    texto.classList.add("text-center");
    texto.textContent = "Añade los elementos del pedido";
    contenido.appendChild(texto);
}

function formularioPropinas(){
    const contenido = document.querySelector("#resumen .contenido");
    
    const formulario = document.createElement("div");
    formulario.classList.add("col-md-6", "formulario");

    const heading = document.createElement("h3");
    heading.classList.add("my-4");
    heading.textContent = "Propina";

    const radio10 = document.createElement("input");
    radio10.type = "radio";
    radio10.name = "propina";
    radio10.value = "10";
    radio10.classList.add("form-check-input");
    radio10.onclick = calcularPropina;

    const radio10label = document.createElement("label");
    radio10label.textContent = "10%";
    radio10label.classList.add("form-check-label");

    const radio10div = document.createElement("div");
    radio10div.classList.add("form-check");

    radio10div.appendChild(radio10);
    radio10div.appendChild(radio10label);


    const radio25 = document.createElement("input");
    radio25.type = "radio";
    radio25.name = "propina";
    radio25.value = "25";
    radio25.classList.add("form-check-input");
    radio25.onclick = calcularPropina;


    const radio25label = document.createElement("label");
    radio25label.textContent = "25%";
    radio25label.classList.add("form-check-label");

    const radio25div = document.createElement("div");
    radio25div.classList.add("form-check");

    radio25div.appendChild(radio25);
    radio25div.appendChild(radio25label);


    const radio50 = document.createElement("input");
    radio50.type = "radio";
    radio50.name = "propina";
    radio50.value = "50";
    radio50.classList.add("form-check-input");
    radio50.onclick = calcularPropina;

    const radio50label = document.createElement("label");
    radio50label.textContent = "50%";
    radio50label.classList.add("form-check-label");

    const radio50div = document.createElement("div");
    radio50div.classList.add("form-check");

    radio50div.appendChild(radio50);
    radio50div.appendChild(radio50label);




    formulario.appendChild(heading);
    formulario.appendChild(radio10div);
    formulario.appendChild(radio25div);
    formulario.appendChild(radio50div);
    contenido.appendChild(formulario);

}

function calcularPropina(){
    const {pedido} = cliente;
    let subtotal = 0; 

    pedido.forEach(articulo =>{
        subtotal += articulo.cantidad * articulo.precio;
    })

    const propinaSelected = document.querySelector('[name="propina"]:checked').value;
    
    //propina
    const propina = ((subtotal * parseInt(propinaSelected))/100);
    //total a pagar
    const total = subtotal+propina;
    mostrarTotalHTML(subtotal,total,propina);

}

function mostrarTotalHTML(subtotal, total,propina){
    const divTotales = document.createElement("div");
    divTotales.classList.add("total-pagar");

    const subtotalParrafo = document.createElement("p");
    subtotalParrafo.classList.add("fs-3", "fw-bold", "mt-5");
    subtotalParrafo.textContent = "Subtotal consumo: ";

    const subtotalSpan = document.createElement("span");
    subtotalSpan.classList.add("fw-normal");
    subtotalSpan.textContent = `$${subtotal}`;
    subtotalParrafo.appendChild(subtotalSpan);


    const propinaParrafo = document.createElement("p");
    propinaParrafo.classList.add("fs-3", "fw-bold", "mt-5");
    propinaParrafo.textContent = "Propina: ";

    const propinaSpan = document.createElement("span");
    propinaSpan.classList.add("fw-normal");
    propinaSpan.textContent = `$${propina}`;
    propinaParrafo.appendChild(propinaSpan);


    const totalParrafo = document.createElement("p");
    totalParrafo.classList.add("fs-3", "fw-bold", "mt-5");
    totalParrafo.textContent = "Total: ";

    const totalSpan = document.createElement("span");
    totalSpan.classList.add("fw-normal");
    totalSpan.textContent = `$${total}`;
    totalParrafo.appendChild(totalSpan);


    //Eliminar el último resultado
    const totalpagarDiv = document.querySelector(".total-pagar");
    if(totalpagarDiv){
        totalpagarDiv.remove();
    }

    divTotales.appendChild(subtotalParrafo);
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo);

    

    const formulario = document.querySelector(".formulario");
    formulario.appendChild(divTotales);
}