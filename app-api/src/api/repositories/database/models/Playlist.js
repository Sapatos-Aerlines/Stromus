'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      this.hasMany(models.Musica, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models.Album, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  
  Playlist.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    musicas: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    tableName: 'playlists',
    modelName: 'Playlist',
  });
  
  return Playlist;
};