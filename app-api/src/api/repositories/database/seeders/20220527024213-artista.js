'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('artistas', [
      {
        id: 1,
        foto: 'https://i.scdn.co/image/21d5b66db963d4c4afe31ec7e2e5281a20742e2d',
        nome: "Guns n' Roses",
        seguidores: "1245421218"
     },
     {
       id: 2,
       foto: 'https://th.bing.com/th/id/OIP.vEuD0NjY5pChstF0qXWwxAHaHV?pid=ImgDet&rs=1',
       nome: "Skid row",
       seguidores: "65465442"
     }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('artistas', null, {});
  }
};
