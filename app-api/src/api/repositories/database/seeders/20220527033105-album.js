'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('albuns', [
      {
        id: 1,
        nome: 'Melhores Skid row',
        dataLancamento: "2022-04-23",
        artista: "Skid row",
        idArtista: 2,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      id: 2,
      nome: 'Skid row remix',
      dataLancamento: "2016-10-15",
      artista: "Skid row",
      idArtista: 2,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('albuns', null, {});

  }
};
