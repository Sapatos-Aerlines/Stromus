const CurtidaRepository = require("../repositories/CurtidaRepository");

module.exports = {
    getAll: async function (){
        return CurtidaRepository.all();
    },
    
    getById: async function (idCurtida) {
        return CurtidaRepository.findById(idCurtida);
    },

    addNew: async function (curtida){
                
        // Criando a música com os dados fornecidos
        const data = await CurtidaRepository.create(curtida);

        if(data) return { status: "Curtida registrada com sucesso." }
        else return { status: "Não foi possível registrar a curtida" }
    },

    removeById: async function (idCurtida) {
        const status = await CurtidaRepository.removeById(idCurtida);
        if(status) return {status: "Curtida removida com sucesso."}
        else return {status: "Não foi possível remover esta curtida."}
    }
}