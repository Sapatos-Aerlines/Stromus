const MusicaService = require("../services/MusicaService");

module.exports = {

    listAll: function (req, res) {
        //Blocking operation (Não fazer)
        //return ItemPatrimonioRepository.all()
        // console.log(ItemPatrimonioRepository.all());
        res.statusCode = 200; // Status HTTP para OK;
        MusicaService.getAllMusicas().then(
            musicas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(musicas));
            }            
        )
    },

    // handler para adcionar nova música no banco
    add: function (req, res) {
        const {artista, nome, duracao, estilo} = req.body
        MusicaService.addNewMusica(
            {artista, nome, duracao, estilo}
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
        MusicaService.getMusicaByNome(
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
        MusicaService.getMusicaByArtista(
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

    // handler para remover uma música pelo seu nome
    removeByName: function (req, res) {
        MusicaService.removeMusicaByName(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.nome).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    },

    // handler para remover uma música pelo seu id
    removeById: function (req, res) {
        MusicaService.removeMusicaById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}