'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Musica extends Model {
    static associate(models) {
      this.belongsTo(models.Artista, {
          foreignKey: 'idArtista',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      })
      this.belongsTo(models.Album, {
        foreignKey: 'idAlbum',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  
  Musica.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracao: {
        type: DataTypes.STRING,
        defaultValue: "00:00"
    },
    estilo: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    tableName: 'musicas',
    modelName: 'Musica',
  });
  
  return Musica;
};