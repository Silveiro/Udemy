const cliente = {
    nombre : "Juan",
    saldo : 500,
}

console.log(typeof Cliente);

function Cliente (nombre, saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}

const pedro = new Cliente ("Pedro", 50000);
console.log(pedro);


function formatearCliente(cliente){
    const {nombre, saldo} = cliente;
    return `El cliente ${nombre} tiene un  saldo de ${saldo}`;
}
function formatearEmpresa(cliente){
    const {nombre, saldo,categoria} = cliente;
    return `El cliente ${nombre} tiene un  saldo de ${saldo} y pertenece a la categoria ${categoria}`;
}

console.log(formatearCliente(pedro));

function Empresa(nombre, saldo,categoria){
    this.nombre = nombre;
    this.saldo = saldo;
    this.categoria = categoria;
}

const CCJ = new Empresa ("codigo con juan", 4000, "cursos en linea");
console.log(formatearEmpresa(CCJ));
