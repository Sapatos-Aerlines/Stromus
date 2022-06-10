const ArtistaRepository = require("../repositories/ArtistaRepository");

module.exports = {
    getAllArtistas: async function (){
        return ArtistaRepository.all();
    },

    getArtistaById: async function (artistaId){
        return ArtistaRepository.findById(artistaId)
    },

    getArtistaByName: async function (artistaId){
        return ArtistaRepository.findByName(artistaId)
    },

    addNewArtista: async function (artista){
        const data = await ArtistaRepository.create(artista);
        if(data) return {status: "Artista criado com sucesso."}
        else return {status: "Não foi possível criar o artista"}
    },
    

    removeArtistaByName: async function (nomeArtista) { 
        const status = await ArtistaRepository.remove(nomeArtista);
        if(status) return {status: "Artista removido com sucesso."}
        else return {status: "Artista não encontrado."}
    }
}