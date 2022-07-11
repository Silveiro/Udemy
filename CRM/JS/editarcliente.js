(function () {
    let DB;
    const nombreInput = document.querySelector("#nombre");
    const correoInput = document.querySelector("#email");
    const telefonoInput = document.querySelector("#telefono");
    const empresaInput = document.querySelector("#empresa");
    const formulario = document.querySelector("#formulario");
    let idCliente;





    document.addEventListener("DOMContentLoaded", () => {
        conectarDB();
        //Actualizar el registro
        formulario.addEventListener("submit", actualizarCliente);


        //verificar el ID de la URL 
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get("id");
        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente)
            }, 2000);
        }
    });

    function actualizarCliente(e) {
        e.preventDefault();
        if (nombreInput.value === "" || correoInput.value === "" || telefonoInput.value === "" || empresaInput.value === ""){
            console.log("Hubo un error");
            return;
        }
        //Actualizar cliente 
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: correoInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente)
        }
        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore("crm");
        objectStore.put(clienteActualizado);
        transaction.oncomplete = function(){
            console.log("editado Correctamente");
        }
        console.log(clienteActualizado);
        setTimeout(() => {
           window.location.href = "index.html"
        }, 4000);
       }

    function obtenerCliente(id) {
        console.log(id);
        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore("crm");
        const cliente = objectStore.openCursor();
        console.log(cliente);
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;
            console.log(cursor);
            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente) {
        const { nombre, email, telefono, empresa } = datosCliente;
        nombreInput.value = nombre;
        correoInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;



    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open("crm", 1);

        abrirConexion.onerror = function () {
            console.log("Hubo un error");
        }
        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        }
    }

})();



/*
https://jobs.lever.co/didi-global/09862ac2-6d79-437e-98f3-d4e9ec030d99
https://www.didiglobal.com/about-didi/cultural
*/