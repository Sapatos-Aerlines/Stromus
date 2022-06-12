'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('albuns', [
      {
        id: 1,
        nome: 'Melhores Skid row',
        dataLancamento: "2022-04-23",
        idArtista: 2
     },
     {
      id: 2,
      nome: 'Skid row remix',
      dataLancamento: "2016-10-15",
      idArtista: 2
   },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('albuns', null, {});

  }
};
