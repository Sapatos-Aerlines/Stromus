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
        console.log("ARTISTA:"+Artista);
        return await Artista.findAll();
    }

    async remove(nomeArtista){
        return await Artista.destroy({
            where: {
                nome: nomeArtista
            }
        });
    }
}

module.exports = new ArtistaRepository();