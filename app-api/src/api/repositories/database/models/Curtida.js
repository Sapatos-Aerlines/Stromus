'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Curtida extends Model {
        static associate(models) {
            this.hasMany(models.Musica, {
                foreignKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }
  
    Curtida.init({
        idMusica: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'curtidas',
        modelName: 'Curtida',
    });
  
  return Curtida;
};