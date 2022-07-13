const criptomonedasSelect = document.querySelector("#criptomonedas");
const monedasSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
document.addEventListener("DOMContentLoaded", consultarCriptomonedas);
document.addEventListener("submit", submitFormulario);
criptomonedasSelect.addEventListener("change", leerValor);
monedasSelect.addEventListener("change", leerValor);



const objBusqueda = {
    moneda:"",
    criptomoneda:"",

}

//Crear un promise 
const obtenerCriptomonedas = criptomonedas => new Promise (resolve =>{
    resolve(criptomonedas)
})

function consultarCriptomonedas(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => obtenerCriptomonedas(resultado.Data))
    .then(criptomonedas => selectCriptomonedas(criptomonedas))

}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName,Name} = cripto.CoinInfo;
        const option = document.createElement("option");
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda)
}

function submitFormulario(e){
    e.preventDefault();

    //validar 
    const {moneda,criptomoneda} = objBusqueda;
    if(moneda === "" || criptomoneda ===""){
        mostrarAlerta("Ambos campos son obligatorios");
        return;
    }

    //consultar API 
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarCotizacion(resultado.DISPLAY[criptomoneda][moneda]));

    }



function mostrarAlerta(msg){
    const existeError = document.querySelector(".error");
    if(!existeError){
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("error");

    //Mensaje de error
    divMensaje.textContent = msg;
    formulario.appendChild(divMensaje);
    setTimeout(() => {
        divMensaje.remove();
    }, 3000);}
}

function mostrarCotizacion(cotizacion){
    console.log(cotizacion);
    const {PRICE, OPENDAY,LOWHOUR,FROMSYMBOL,TOSYMBOL} = cotizacion;
    console.log(PRICE,OPENDAY,LOWHOUR,FROMSYMBOL,TOSYMBOL)
    const resultado = document.querySelector("#resultado");
    
    resultado.innerHTML = `
    <p style ="font-size:20px;">FROM: ${TOSYMBOL}</p> <br>
    <p style ="font-size:20px;">TO: ${FROMSYMBOL}</p><br>
    <p style ="font-size:20px;">PRECIO: ${PRICE} </p><br>
    <p style ="font-size:20px;">APERTURA: ${OPENDAY} </p><br>
    <p style ="font-size:20px;">MINIMO: ${LOWHOUR}</p> <br>
    

    `
    
}