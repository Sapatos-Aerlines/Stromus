const PlaylistService = require("../services/PlaylistService");

module.exports = {

    // handler para listar todos os artistas
    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        PlaylistService.getAll().then(
            artistas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(artistas));
            }            
        )
    },

    // handler para adcionar novo artista no banco
    add: function (req, res) {
        PlaylistService.addNew(
            req.body
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

    update: function(req, res){
        const {id, nome, foto, musicas} = req.body
        PlaylistService.update(
            {id, nome, foto, musicas}
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

    // handler para recuperar um artista por id
    getById: function (req, res) {
        const playlistId = req.params.id;
        PlaylistService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            playlistId).then((playlist) => {
                if(playlist){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(playlist));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a playlist ${playlistId}.`});
                }                
            });
    },

    // handler para recuperar um artista por nome
    getByName: function (req, res) {
        const playlistId = req.params.nome;
        PlaylistService.getByName(
            playlistId).then((playlist) => {
                if(playlist){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(artista));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a playlist ${playlistId}.`});
                }                
            });
    },

    remove: function (req, res) {
        PlaylistService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}