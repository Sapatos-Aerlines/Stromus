const PlaylistRepository = require("../repositories/PlaylistRepository");

module.exports = {
    getAll: async function (){
        return PlaylistRepository.all();
    },

    update: async function (playlist){
        return PlaylistRepository.update(playlist);  
    },

    getById: async function (idPlaylist) {
        return PlaylistRepository.findById(idPlaylist);
    },

    getByNome: async function (nome) {
        return PlaylistRepository.findByName(nome);
    },

    addNew: async function (playlist){
                
        // Criando a música com os dados fornecidos
        const data = await PlaylistRepository.create(playlist);

        if(data) return { status: "Playlist criada com sucesso." }
        else return { status: "Não foi possível criar a playlist" }
    },

    removeById: async function (idPlaylist) {
        const status = await PlaylistRepository.removeById(idPlaylist);
        if(status) return {status: "Playlist removida com sucesso."}
        else return {status: "Playlist não encontrada."}
    }
}