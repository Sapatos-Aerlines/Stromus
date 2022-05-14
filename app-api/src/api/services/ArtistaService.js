const ArtistaRepository = require("../repositories/ArtistaRepository");

module.exports = {
    getAllArtistas: async function (){
        const data = await ArtistaRepository.all();
        return data;
    },

    getArtistaById: async function (artistaId){
        const data = await ArtistaRepository.find(artistaId)
        return data;
    },

    addNewArtista: async function (artista){
        const data = await ArtistaRepository.create(artista);
        if(data) return {status: "Artista criado com sucesso."}
        else return {status: "Não foi possível criar o artista"}
    },
    
    removeArtistaById: async function(artistaId) {
        const status = await ArtistaRepository.remove(artistaId);
        if(status) return {status: "Artista removido com sucesso."}
        else return {status: "Artista não encontrado."}
    }
}