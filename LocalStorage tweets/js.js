//variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#listaTweets");
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    //cuando el documento esta listo 
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse( localStorage.getItem("tweets") ) || [];
        console.log(tweets);

        crearHTML();
    });
    
}






//Funciones 
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;
    if (tweet === "") {
        mostrarError("No puede ir vacio");
        return;
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];
    console.log(tweets);
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}


//Mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;

    //insertarlo en el contenido
    const contenido = document.querySelector("#ladoIzq");
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function crearHTML() {
    limpiarHTML();


    if (tweets.length > 0) {

        tweets.forEach(tweet => {
            //crear un boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = "x";

            //añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
    

            //crear el HTML
            const li = document.createElement("li");

            //añadir el texto 
            li.innerText = tweet.tweet;

            //Asignar el Boton 
            li.appendChild(btnEliminar);

            // insertarlo en el HTML 
            listaTweets.appendChild(li);


        })
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
    console.log(tweets);
}




// limpiar el HTML 
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

