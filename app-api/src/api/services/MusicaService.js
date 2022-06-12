const MusicaRepository = require("../repositories/MusicaRepository");
const ArtistaRepository = require("../repositories/ArtistaRepository");
const AlbumRepository = require("../repositories/AlbumRepository");

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

        console.log("Dados da música:", musica);

        // Buscando o artista pelo Nome
        const artista = await ArtistaRepository.findByName(musica.idArtista)
        if(!artista) return { status: "Artista não encontrado." }
        musica.idArtista = artista.id;
        
        // Buscando o álbum pelo nome
        const album = await AlbumRepository.findByName(musica.idAlbum)
        if(!album) return { status: "Album não encontrado." }
        musica.idAlbum = album.id;

        console.log("Música pós verificações: ", musica);
        
        const data = await MusicaRepository.create(musica);

        if(data) return { status: "Música criada com sucesso." }
        else return { status: "Não foi possível criar a música" }
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