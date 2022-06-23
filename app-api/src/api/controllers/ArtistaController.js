const ArtistaService = require("../services/ArtistaService");

module.exports = {

    // handler para listar todos os artistas
    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        ArtistaService.getAll().then(
            artistas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(artistas));
            }            
        )
    },

    // handler para adcionar novo artista no banco
    add: function (req, res) {
        ArtistaService.addNew(
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
        const {id, nome, seguidores, foto} = req.body
        ArtistaService.update(
            {id, nome, seguidores, foto}
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
        const artistaId = req.params.id;
        ArtistaService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            artistaId).then((artista) => {
                if(artista){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(artista));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar o artista para ${artistaId}.`});
                }                
            });
    },

    // handler para recuperar um artista por nome
    getByName: function (req, res) {
        const artistaId = req.params.nome;
        ArtistaService.getByName(
            artistaId).then((artista) => {
                if(artista){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(artista));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar o artista para ${artistaId}.`});
                }                
            });
    },

    // handler para remover um artista pelo seu id (estamos usando o nome para remover)
    remove: function (req, res) {
        ArtistaService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}