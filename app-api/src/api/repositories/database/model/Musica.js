const db = require("../database")
const sequelize = db.sequelize
const {Model, DataTypes} = require('sequelize');

class Musica extends Model {
    static associate({Artista}) {
        this.belongsTo(Artista, {foreignKey: 'idArtista', as: 'artista'})
    }
}

Musica.init({
    artista: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracao: {
        type: DataTypes.TIME,
        defaultValue: "00:00"
    },
    estilo: {
        type: DataTypes.STRING,
        defaultValue: "0"
    }
}, {
    sequelize,
    tableName: 'musicas',
    modelName: 'Musica'
});

module.exports = Musica;