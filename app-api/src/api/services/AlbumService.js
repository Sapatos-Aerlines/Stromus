const AlbumRepository = require("../repositories/AlbumRepository");
const ArtistaRepository = require("../repositories/ArtistaRepository");

module.exports = {
    getAllAlbuns: async function (){
        return AlbumRepository.all();
    },

    getAlbumById: async function (idAlbum) {
        return AlbumRepository.findById(idAlbum);
    },

    getAlbumByNome: async function (nome) {
        return AlbumRepository.findByName(nome);
    },

    getAlbumByArtista: async function (nomeArtista){
        return AlbumRepository.findByArtista(nomeArtista)
    },

    getAlbumByEstilo: async function (estilo){
        return AlbumRepository.findByEstilo(estilo)
    },

    getAlbumByAno: async function (ano) {
        return AlbumRepository.findByAnoLancamento(ano)
     },

    addNewAlbum: async function (album){

        console.log("Dados de álbum recebidos:", album);
        
        if(!album.idArtista) return console.log("Artista não especificado, cancelando")

        // Criando o álbum com os dados fornecidos
        const data = await AlbumRepository.create(album);
        if(data) return { status: "Álbum criado com sucesso." }
        else return { status: "Não foi possível criar o álbum" }
    },

    removeAlbumById: async function (idAlbum) {
        const status = await AlbumRepository.removeById(idAlbum);
        if(status) return {status: "Álbum removido com sucesso."}
        else return {status: "Álbum não encontrado."}
    }
}