'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artistas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foto: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      seguidores: {
        type: Sequelize.STRING
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Artistas');
  }
};