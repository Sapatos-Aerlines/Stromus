const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      this.hasMany(models.Musica, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.belongsTo(models.Artista, {
        foreignKey: 'idArtista',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  
  Album.init({
    nome: DataTypes.STRING,
    dataLancamento: DataTypes.DATE,
    capa: DataTypes.STRING
  }, {
    sequelize: sequelize,
    tableName: 'albuns',
    modelName: 'Album',
  });
  
  return Album;
}