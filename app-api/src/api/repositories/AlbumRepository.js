const { Album } = require("./database/models/index")

class AlbumRepository {

    async create(album) {
        return await Album.create(album);
    }

    async findById(idAlbum) {
        return await Album.findAll({
            where: {
                id: idAlbum
            }
        });
    }

    async findByName(nomeAlbum) {
        return await Album.findAll({
            where: {
                nome: nomeAlbum
            }
        });
    }

    async findByArtista(nomeArtista) {
        return await Album.findAll({
            where: {
                artista: nomeArtista
            }
        })
    }

    async findByAnoLancamento(ano) {
        return await Album.findAll({
            where: {
                dataLancamento: ano
            }
        })
    }

    async all() {
        return await Album.findAll();
    }

    async removeByName(nomeAlbum) {
        return await Album.destroy({
            where: {
                nome: nomeAlbum
            }
        });
    }

    async removeById(idAlbum) {
        return await Album.destroy({
            where: {
                id: idAlbum
            }
        })
    }
}

module.exports = new AlbumRepository();