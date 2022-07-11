let DB;
document.addEventListener("DOMContentLoaded", () =>{
    crmDB();

    setTimeout(() => {
        crearCliente();
    }, 5000);
})

function crmDB(){
    //crear la base de datos version 1,0
    let crmDB = window.indexedDB.open ("crm",1);

    //Si hay un error 
    crmDB.onerror = function() {
        console.log("Hubo un error a la hora de crear la BBDD");
    } 

    //Si se crea correctamente
    crmDB.onsuccess = function() {
        console.log("base de datos creada");
        DB = crmDB.result;
    }


    //Configuración de la base de datos
    crmDB.onupgradeneeded = function(e) {
        const db = e.target.result;


        const objectStore = db.createObjectStore("crm", {
            keyPath:"crm",
            autoIncrement: true,

        });

        //Definir las columnas
        objectStore.createIndex("nombre", "nombre", {unique:false});
        objectStore.createIndex("email", "email", {unique:true});
        objectStore.createIndex("telefono", "telefono", {unique:false});

    }

    
}

function crearCliente (){
    let transaction = DB.transaction (["crm"], "readwrite");

    transaction.oncomplete = function () {
        console.log("Transaccion completada");
    }
    
    transaction.onerror = function () {
        console.log("hubo un error en la transacción");
    }
    

    const objectStore = transaction.objectStore("crm");
    
    const nuevoCliente = {
        telefono: 123123,
        nombre: "Juan",
        email: "correo@correo.com"
    }

    const peticion = objectStore.add(nuevoCliente);
    console.log(peticion);

}