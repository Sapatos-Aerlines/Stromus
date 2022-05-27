const Album = require("./database/models/Album");

class AlbumRepository{
    constructor(){
        this.model = Album;
    }

    async create(album){
        return this.model.create(album);
    }

    async findById(idAlbum){
        return this.model.findAll({
            where: {
                id: idAlbum
            }
        });
    }

    async findByName(nomeAlbum){
        return this.model.findAll({
            where: {
                nome: nomeAlbum
            }
        });
    }

    async findByArtista(nomeArtista){
        return this.model.findAll({
            where: {
                artista: nomeArtista
            }
        })
    }

    async findByAnoLancamento(ano) {
        return this.model.findAll({
            where: {
                dataLancamento: ano
            }
        })
    }

    async all(){
        return this.model.findAll();
    }

    async removeByName(nomeAlbum) {
        return this.model.destroy({
            where: {
                nome: nomeAlbum
            }
        });
    }

    async removeById(idAlbum) {
        return this.model.destroy({
            where: {
                id: idAlbum
            }
        })
    }
}

module.exports = new AlbumRepository();