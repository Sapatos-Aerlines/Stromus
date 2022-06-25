const { Curtida } = require("./database/models/index")

class CurtidaRepository{

    async create(curtida){
        return await Curtida.create(curtida);
    }

    async findById(idCurtida){
        return await Curtida.findAll({
            where: {
                id: idCurtida
            }
        });
    }

    async all(){
        return await Curtida.findAll();
    }

    async removeById(idCurtida){
        return await Curtida.destroy({
            where: {
                id: idCurtida
            }
        })
    }
}

module.exports = new CurtidaRepository();