const { Musica } = require("./database/models/index")

class MusicaRepository {

    async create(musica) {
        return await Musica.create(musica);
    }

    async findById(idmusica) {
        return await Musica.findAll({
            where: {
                id: idmusica
            }
        });
    }

    async findByArtista(idArtista) {
        return await Musica.findAll({
            where: {
                idArtista: idArtista
            }
        });
    }

    async findByAlbum(idAlbum) {
        return await Musica.findAll({
            where: {
                idAlbum: idAlbum
            }
        });
    }

    async findByEstilo(_estilo) {
        return await Musica.findAll({
            where: {
                estilo: _estilo
            }
        });
    }

    async findByName(nomeMusica) {
        return await Musica.findAll({
            where: {
                nome: nomeMusica
            }
        });
    }

    async all() {
        return await Musica.findAll();
    }

    async update(musica) {
        
        return await Musica.update(
            musica,
            { where: {id: musica.id}}
        )
    }

    async removeByName(nomeMusica) {
        return await Musica.destroy({
            where: {
                nome: nomeMusica
            }
        });
    }

    async removeById(idMusica) {
        return await Musica.destroy({
            where: {
                id: idMusica
            }
        });
    }
}

module.exports = new MusicaRepository();