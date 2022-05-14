const Artista = require("./model/Artista");

// Classe que serve de banco de dados temporário. Será substituído pelo ORM.
class Banco {
    constructor() {
        this.artistas = []
    }

    getAllArtistas() {
        return this.artistas;
    }

    addArtista(novoArtista) {
        if(novoArtista instanceof Artista){
            this.artistas.push(novoArtista)
        }else{
            throw Error("DB: Objeto não é do tipo Artista")
        }
    }

    findByName(nome) {
          return this.artistas.filter(artista => artista.nome === nome)[0];
    }

    removeByName(nome) {
        return this.artistas.splice(this.artistas.findIndex(artista => artista.nome === nome), 1)
    }

}

let banco = new Banco();

module.exports = banco;