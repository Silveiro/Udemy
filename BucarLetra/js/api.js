import * as UI from './interfaz.js'

function Spinner(){
       console.log("spinner en ejec")
        UI.divResultado.innerHTML = `
        <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
        </div>
        `
    }

class API{
    constructor(artista,cancion){
        this.artista = artista;
        this.cancion = cancion;
    }
    consultarAPI(){
        Spinner();
        const url =`https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado =>{
            if(resultado.lyrics){
            const {lyrics} = resultado;
            UI.divResultado.textContent = lyrics;
            UI.headingResultado.textContent = `Letra de la canción: ${this.cancion} de ${this.artista}`
            }else{
                UI.divMensajes.textContent = "La canción no fue encontrada, intenta con otra";
                UI.divMensajes.classList.add("error")
                setTimeout(() => {
                    UI.divMensajes.textContent = " ";
                    UI.divMensajes.classList.remove("error");    
                }, 3000);
            }
            
        })
        .catch(error => {
            console.log(error);
        })
    }
    
}





export default API;
