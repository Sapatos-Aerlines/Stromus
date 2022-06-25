'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      capa: {
        type: Sequelize.STRING
      },
      musicas: {
        type: Sequelize.STRING
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Playlists');
  }
};