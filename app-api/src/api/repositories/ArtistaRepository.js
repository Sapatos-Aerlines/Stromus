const { Artista } = require("./database/models/index")

class ArtistaRepository{

    async create(artista){
        return await Artista.create(artista);
    }

    async findById(idArtista){
        return await Artista.findAll({
            where: {
                id: idArtista
            }
        });
    }

    async findByName(nomeArtista){
        return await Artista.findAll({
            where: {
                nome: nomeArtista
            }
        });
    }

    async all(){
        return await Artista.findAll();
    }

    async update(artista) {
        return await Artista.update(
            artista,
            { where: {id: artista.id}}
        )
    }

    async removeId(idArtista){
        return await Artista.destroy({
            where: {
                id: idArtista
            }
        })
    }
}

module.exports = new ArtistaRepository();