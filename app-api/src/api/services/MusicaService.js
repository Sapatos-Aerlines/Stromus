const MusicaRepository = require("../repositories/MusicaRepository");
const ArtistaRepository = require("../repositories/ArtistaRepository");

module.exports = {
    getAllMusicas: async function (){
        return MusicaRepository.all();
    },

    getMusicaById: async function (idMusica) {
        return MusicaRepository.findById(idMusica);
    },

    getMusicaByNome: async function (nome) {
        return MusicaRepository.findByName(nome);
    },

    getMusicaByArtista: async function (nomeArtista){
        return MusicaRepository.findByArtista(nomeArtista)
    },

    getMusicaByEstilo: async function (estilo){
        return MusicaRepository.findByEstilo(estilo)
    },

    addNewMusica: async function (musica){
        const artista = await ArtistaRepository.findByName(musica.artista)
        if(!artista) return {status: "Artista não encontrado."}
        musica.idArtista = artista.id
        const data = await MusicaRepository.create(musica);
        if(data) return {status: "Música criado com sucesso."}
        else return {status: "Não foi possível criar a música"}
    },

    removeMusicaById: async function (idMusica) {
        const status = await MusicaRepository.removeById(idMusica);
        if(status) return {status: "Música removida com sucesso."}
        else return {status: "Música não encontrada."}
    },
    

    removeMusicaByName: async function (nomeMusica) { 
        const status = await MusicaRepository.removeByName(nomeMusica);
        if(status) return {status: "Música removida com sucesso."}
        else return {status: "Música não encontrada."}
    }
}