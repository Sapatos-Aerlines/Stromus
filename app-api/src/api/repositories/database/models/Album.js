const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      this.hasMany(models.Musica, {
        foreignKey: 'id',
        as: 'musicas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.belongsTo(models.Artista, {
        foreignKey: 'id',
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
    sequelize: sequelize,
    tableName: 'albuns',
    modelName: 'Album',
  });
  return Album;
}