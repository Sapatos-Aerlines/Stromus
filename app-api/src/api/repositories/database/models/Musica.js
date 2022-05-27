'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Musica extends Model {
    static associate(models) {
      this.belongsTo(models.Artista, {
          foreignKey: 'idArtista',
          as: 'idArtista',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      })
      this.belongsTo(models.Album, {
        foreignKey: 'idAlbum',
        as: 'idAlbum',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
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
    },
    idArtista: DataTypes.INTEGER,
    idAlbum: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'musicas',
    modelName: 'Musica',
  });
  return Musica;
};