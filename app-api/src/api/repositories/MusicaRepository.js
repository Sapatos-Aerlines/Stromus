const Musica = require("./database/model/Musica");

class MusicaRepository{
    constructor(){
        this.model = Musica;
    }

    async create(musica){
        return this.model.create(musica);
    }

    async findById(idmusica){
        return this.model.findAll({
            where: {
                id: idmusica
            }
        });
    }

    async findByArtista(nomeArtista){
        return this.model.findAll({
            where: {
                artista: nomeArtista
            }
        });
    }

    async findByEstilo(_estilo){
        return this.model.findAll({
            where: {
                estilo: _estilo
            }
        });
    }

    async findByName(nomeMusica){
        return this.model.findAll({
            where: {
                nome: nomeMusica
            }
        });
    }

    async all(){
        return this.model.findAll();
    }

    async removeByName(nomeMusica){
        return this.model.destroy({
            where: {
                nome: nomeMusica
            }
        });
    }

    async removeById(idMusica){
        return this.model.destroy({
            where: {
                id: idMusica
            }
        });
    }
}

module.exports = new MusicaRepository();
