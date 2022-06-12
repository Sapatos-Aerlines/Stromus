const AlbumService = require("../services/AlbumService");

module.exports = {

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        AlbumService.getAllAlbuns().then(
            musicas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(musicas));
            }
        )
    },

    // handler para adcionar novo álbum no banco
    add: function (req, res) {
        const {nome, dataLancamento, idArtista, capa} = req.body
        AlbumService.addNewAlbum(
            {nome, dataLancamento, idArtista, capa}
        ).then((status) => {
            res.statusCode = 201; // Status HTTP para created;
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(status));
        }).catch(error => {
            console.error(error);
            res.statusCode = 500; //Status HTTP para erro interno
            res.set("Content-Type", "application/text");
            res.send(error.message);
        });
    },

    // handler para recuperar uma música por id
    getById: function (req, res) {
        const id = req.params.id;
        AlbumService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            id).then((album) => {
                if(album){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(album));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar o álbum para ${id}.`});
                }                
            });
    },

    // handler para recuperar um álbum por nome
    getByName: function (req, res) {
        const nome = req.params.nome;
        AlbumService.getAlbumByNome(
            nome).then((album) => {
                if(album){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(album));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a música com o nome ${nome}.`});
                }                
            });
    },

    getByAno: function (req, res) {
        const ano = req.params.ano;
        AlbumService.getAlbumByAno(ano).then(
            (album) => {
                if(album){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(album));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível o álbum com o ano ${ano}.`});
                }
            });
    },

    // handler para recuperar um álbum por artista
    getByArtista: function (req, res) {
        const nomeArtista = req.params.nomeArtista;
        AlbumService.getAlbumByArtista(
            nomeArtista).then((album) => {
                if(album){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(album));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar o álbum com artista ${nomeArtista}.`});
                }                
            });
    },

    // handler para remover um álbum pelo seu id
    remove: function (req, res) {
        AlbumService.removeAlbumById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}