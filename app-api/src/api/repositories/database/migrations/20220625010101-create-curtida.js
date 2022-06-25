'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Curtidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMusica: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'musicas',
          key: 'id'
        }
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Curtidas');
  }
};