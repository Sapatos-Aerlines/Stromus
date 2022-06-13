const ArtistaRepository = require("../repositories/ArtistaRepository");

module.exports = {
    getAll: async function (){
        return ArtistaRepository.all();
    },

    getById: async function (artistaId){
        return ArtistaRepository.findById(artistaId)
    },

    getByName: async function (artistaId){
        return ArtistaRepository.findByName(artistaId)
    },

    addNew: async function (artista){
        const data = await ArtistaRepository.create(artista);
        if(data) return {status: "Artista criado com sucesso."}
        else return {status: "Não foi possível criar o artista"}
    },
    
    removeById: async function (idArtista) {
        const status = await ArtistaRepository.removeId(idArtista);
        if(status) return {status: "Artista removido com sucesso."}
        else return {status: "Artista não encontrado."}
    }
}