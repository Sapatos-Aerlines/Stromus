const MusicaService = require("../services/MusicaService");

module.exports = {

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        MusicaService.getAll().then(
            musicas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(musicas));
            }            
        )
    },

    // handler para adcionar nova música no banco
    add: function (req, res) {
        const {id, idArtista, idAlbum, nome, duracao, estilo} = req.body
        
        MusicaService.addNew(
            {id, idArtista, idAlbum, nome, duracao, estilo}
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

    update: function (req, res){
        const {id, idArtista, idAlbum, nome, duracao, estilo} = req.body
        MusicaService.update(
            {id, idArtista, idAlbum, nome, duracao, estilo}
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
        MusicaService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            id).then((musica) => {
                if(musica){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(musica));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a música para ${id}.`});
                }                
            });
    },

    // handler para recuperar uma música por nome
    getByName: function (req, res) {
        const nome = req.params.nome;
        MusicaService.getByNome(
            nome).then((musica) => {
                if(musica){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(musica));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a música com o nome ${nome}.`});
                }                
            });
    },

    // handler para recuperar uma música por musica
    getByArtista: function (req, res) {
        const nomeArtista = req.params.nomeArtista;
        MusicaService.getByArtista(
            nomeArtista).then((musica) => {
                if(musica){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(musica));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a música com artista ${nomeArtista}.`});
                }                
            });
    },
    
    getByAlbum: function (req, res) {
        const idAlbum = req.params.idAlbum;
        MusicaService.getByAlbum(
            idAlbum).then((musica) => {
                if(musica){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(musica));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a música para o álbum de ID: ${idAlbum}.`});
                }                
            });
    },

    // handler para remover uma música pelo seu id
    remove: function (req, res) {
        MusicaService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}