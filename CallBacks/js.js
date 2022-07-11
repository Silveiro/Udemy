
// ESTO ES UN EJEMPLO DE CALLBACK
/*
const paises = ["Francia", "Colombia","Ecuador","Mexico"];

function nuevoPais(pais, callback){
    setTimeout(() => {
       paises.push(pais);
       callback(); 
    }, 3000);
}

function mostrarPaises(){
    setTimeout(() => {
        paises.forEach(pais => {
            console.log(pais);
        });
    }, 1000);
}


mostrarPaises();
nuevoPais("Alemania", mostrarPaises);


// ESTO ES UN EJEMPLO DE CALLBACKHELL

const paises = [];

function nuevoPais(pais,callBack){
    paises.push(pais);
    console.log(`Agregando: ${pais}`)
    callBack();
}

function mostrarPaises(){
    console.log(paises);
}

function iniciarCallBackHell(){
    setTimeout(() => {
        nuevoPais("Alemania", mostrarPaises)
        setTimeout(() => {
            nuevoPais("Colombia", mostrarPaises)
            setTimeout(() => {
                nuevoPais("Venezuela", mostrarPaises)
                setTimeout(() => {
                    nuevoPais("Monaco", mostrarPaises)
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

iniciarCallBackHell();


// ESTO ES UN EJEMPLO DE PROMISE CON THEN Y CATCH

const aplicarDescuento = new Promise( (resolve,reject)=>{
    const descuento = true
    if(descuento){
        resolve("Descuento Aplicado")
    }else{
        reject("No se pudo aplicar el descuento")
    }
})

aplicarDescuento
.then(resultado => descuent(resultado))
.catch(error =>console.log(error))

function descuent (mensaje){
    console.log(mensaje);
}
*/

// DE CALLBACKHELL A PROMISES

const paises = [];

function nuevoPais(pais,callBack){
    paises.push(pais);
    console.log(`Agregando: ${pais}`)
    callBack();
}

function mostrarPaises(){
    console.log(paises);
}
function iniciarCallBackHell(){
    setTimeout(() => {
        nuevoPais("Alemania", mostrarPaises)
        setTimeout(() => {
            nuevoPais("Colombia", mostrarPaises)
            setTimeout(() => {
                nuevoPais("Venezuela", mostrarPaises)
                setTimeout(() => {
                    nuevoPais("Monaco", mostrarPaises)
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

iniciarCallBackHell();


const paisess =[];
const nuevoPaiss = paiss => new Promise (resolve =>{
    setTimeout(() => {
        paisess.push(paiss);
        resolve("El resultado del resolve")
    }, 3000);
})

nuevoPaiss("Alemania")
.then(resultado=>{
    console.log(resultado);
    console.log(paisess);
    return nuevoPaiss("Francia")
})
.then(resultado=>{
    console.log(resultado)
})