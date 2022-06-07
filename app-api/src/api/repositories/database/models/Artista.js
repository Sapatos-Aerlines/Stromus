const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artista extends Model {
    static associate(models) {
      this.hasMany(models.Musica, {
        foreignKey: 'idArtista',
        as: 'musicas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models.Album, {
        foreignKey: 'idAlbum',
        as: 'albuns',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
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
    sequelize: sequelize,
    tableName: 'artistas',
    modelName: 'Artista'
  });
  return Artista;
}