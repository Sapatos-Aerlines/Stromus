const MusicaRepository = require("../repositories/MusicaRepository");

module.exports = {
    getAll: async function (){
        return MusicaRepository.all();
    },

    getById: async function (idMusica) {
        return MusicaRepository.findById(idMusica);
    },

    getByNome: async function (nome) {
        return MusicaRepository.findByName(nome);
    },

    getByArtista: async function (nomeArtista){
        return MusicaRepository.findByArtista(nomeArtista)
    },

    getByAlbum: async function (idAlbum){
        return MusicaRepository.findByAlbum(idAlbum)
    },

    getByEstilo: async function (estilo){
        return MusicaRepository.findByEstilo(estilo)
    },

    addNew: async function (musica){
                
        // Criando a música com os dados fornecidos
        const data = await MusicaRepository.create(musica);

        if(data) return { status: "Música criada com sucesso." }
        else return { status: "Não foi possível criar a música" }
    },

    removeById: async function (idMusica) {
        const status = await MusicaRepository.removeById(idMusica);
        if(status) return {status: "Música removida com sucesso."}
        else return {status: "Música não encontrada."}
    }
}