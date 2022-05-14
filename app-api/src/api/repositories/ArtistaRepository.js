const database = require("./database/database");
const Artista = require("./database/model/Artista");
const ArtistaSeed = require("./database/seed/ArtistaSeed");

class ArtistaRepository{
    constructor(){
        // Quando definirmos o ORM, precisaremos adicionar o model aqui.
        // this.model = ItemPatrimonioModel;
        ArtistaSeed(database);
        this.database = database;
    }

    async create(artista){
        const newArtista = new Artista(artista);
        database.addArtista(newArtista);
        return newArtista;
    }

    async find(nome){
        return database.findByName(nome);
    }

    async all(){
        return database.getAllArtistas();
    }

    async remove(artistaNome){
        return database.removeByName(artistaNome);
    }
}

module.exports = new ArtistaRepository();
