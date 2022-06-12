function Arrendador (nombre, apellido, propiedades, valor) {
this.nombre = nombre;
this.apellido = apellido;
this.propiedades = propiedades;
this.valor = valor;
}

var nataQueirolo = new Arrendador ("Natalaia", "Qeirolo", 4, 100000000);

function Arrendatario (nombre, apellido, empresa, sueldo){
    Arrendador.call(this,nombre,apellido);
    this.empresa = empresa;
    this.sueldo = sueldo;
}

var sebasSilva = new Arrendatario ("Sebastián", "Silva", "Justo", 1400000);

Arrendador.prototype.cobrar = function (arreendador1, arrendatario1, valorarriendo){
    console.log(arrendatario1.nombre + ", Cae con el billegas");
    console.log("toma "  + arreendador1.nombre + ", tus " + valorarriendo)
    arreendador1.valor += valorarriendo;
    arrendatario1.sueldo -= valorarriendo;
}

console.log(nataQueirolo);
console.log(sebasSilva);
nataQueirolo.cobrar(nataQueirolo,sebasSilva,150000);
console.log(nataQueirolo);
console.log(sebasSilva);