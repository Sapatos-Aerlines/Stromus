class Artista {
    constructor(dadosArtista) {
        this.foto = dadosArtista.foto
        this.nome = dadosArtista.nome
        this.seguidores = parseInt(dadosArtista.seguidores)
    }
}

module.exports = Artista;