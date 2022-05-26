const Artista = require("./database/model/Artista");

class ArtistaRepository{
    constructor(){
        this.model = Artista;
    }

    async create(artista){
        return this.model.create(artista);
    }

    async findById(idArtista){
        return this.model.findAll({
            where: {
                id: idArtista
            }
        });
    }

    async findByName(nomeArtista){
        return this.model.findAll({
            where: {
                nome: nomeArtista
            }
        });
    }

    async all(){
        return this.model.findAll();
    }

    async remove(nomeArtista){
        return this.model.destroy({
            where: {
                nome: nomeArtista
            }
        });
    }
}

module.exports = new ArtistaRepository();
