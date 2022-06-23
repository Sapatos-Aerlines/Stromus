const AlbumRepository = require("../repositories/AlbumRepository");

module.exports = {
    getAll: async function (){
        return AlbumRepository.all();
    },

    update: async function (album){
        return AlbumRepository.update(album);  
    },

    getById: async function (idAlbum) {
        return AlbumRepository.findById(idAlbum);
    },

    getByNome: async function (nome) {
        return AlbumRepository.findByName(nome);
    },

    getByArtista: async function (nomeArtista){
        return AlbumRepository.findByArtista(nomeArtista)
    },

    getByEstilo: async function (estilo){
        return AlbumRepository.findByEstilo(estilo)
    },

    getByAno: async function (ano) {
        return AlbumRepository.findByAnoLancamento(ano)
     },

    addNew: async function (album){
   
        if(!album.idArtista) return console.log("Artista não especificado, cancelando")

        // Criando o álbum com os dados fornecidos
        const data = await AlbumRepository.create(album);
        if(data) return { status: "Álbum criado com sucesso." }
        else return { status: "Não foi possível criar o álbum" }
    },

    removeById: async function (idAlbum) {
        const status = await AlbumRepository.removeById(idAlbum);
        if(status) return {status: "Álbum removido com sucesso."}
        else return {status: "Álbum não encontrado."}
    }
}