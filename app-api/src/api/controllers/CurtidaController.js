const CurtidaService = require("../services/CurtidaService");

module.exports = {

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        CurtidaService.getAll().then(
            curtidas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(curtidas));
            }            
        )
    },

    // handler para adicionar nova curtida no banco
    add: function (req, res) {
        const {id, idMusica} = req.body
        
        CurtidaService.addNew(
            {id, idMusica}
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
        CurtidaService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            id).then((curtida) => {
                if(curtida){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(curtida));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar a música para ${id}.`});
                }                
            });
    },

    // handler para remover uma curtida pelo seu id
    remove: function (req, res) {
        CurtidaService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}