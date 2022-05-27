'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Albuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      dataLancamento: {
        type: Sequelize.DATE
      },
      artista: {
        type: Sequelize.STRING
      },
      idArtista: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'artistas',
          key: 'id',
          as: 'idArtista'
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
    await queryInterface.dropTable('Albuns');
  }
};