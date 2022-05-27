'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      this.hasMany(models.Musica, {
        foreignKey: 'idMusica',
        as: 'musicas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.belongsTo(models.Artista, {
        foreignKey: 'idArtista',
        as: 'idArtista',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Album.init({
    nome: DataTypes.STRING,
    dataLancamento: DataTypes.DATE,
    artista: DataTypes.STRING,
    idArtista: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'albuns',
    modelName: 'Album',
  });
  return Album;
};