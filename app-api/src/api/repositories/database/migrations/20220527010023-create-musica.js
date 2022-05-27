'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Musicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artista: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      duracao: {
        type: Sequelize.TIME
      },
      estilo: {
        type: Sequelize.STRING
      },
      idArtista: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'artistas',
          key: 'id',
          as: 'idArtista',
        }
      },
      idAlbum: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'albuns',
          key: 'id',
          as: 'idAlbum',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Musicas');
  }
};