'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('musicas', [
      {
        id: 1,
        artista: 'Skid row',
        nome: "18 and life",
        duracao: "03:42",
        estilo: "power metal",
        idArtista: 2,
        idAlbum: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       id: 2,
       artista: 'Skid row',
       nome: "Slave to the grind",
       duracao: "04:25",
       estilo: "power metal",
       idArtista: 2,
       idAlbum: 2,
       createdAt: new Date(),
       updatedAt: new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('musicas', null, {});

  }
};
