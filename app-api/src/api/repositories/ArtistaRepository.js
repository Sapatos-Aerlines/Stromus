const { Artista } = require("./database/models/index")

class ArtistaRepository{

    async create(artista){
        console.log(Artista);
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
        console.log("Artista:", Artista);
        return await Artista.findAll();
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