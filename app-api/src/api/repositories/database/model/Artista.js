const db = require("../database")
const sequelize = db.sequelize
const {Model, DataTypes} = require('sequelize');
class Artista extends Model {
    static associate({Musica}){
        this.hasMany(Musica, {foreignKey: 'idArtista', as: 'musicas'})
    }
}

Artista.init({
    foto: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seguidores: {
        type: DataTypes.STRING,
        defaultValue: "0"
    }
}, {
    sequelize,
    tableName: 'artistas',
    modelName: 'Artista'
});

module.exports = Artista;