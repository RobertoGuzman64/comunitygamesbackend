'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comunidads', [
      {"titulo":"Clash Royale","imagen":"https://i.blogs.es/8935db/lroyale/1366_2000.jpg","genero": "Estrategia", "fecha": "2022-03-04","popularidad":"08","descripcion":"Juego de estrategia y Construcción","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"Call of Duty","imagen":"https://i.blogs.es/b2ec36/warzone/840_560.jpeg","genero": "Guerra", "fecha": "2022-03-04","popularidad":"09","descripcion":"Juego de soldados etc....","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"MineCraft","imagen":"https://www.minecraft.net/content/dam/games/minecraft/key-art/CC-Update-Part-II_600x360.jpg","genero": "Construcción", "fecha": "2015-05-07","popularidad":"05","descripcion":"Juego Construcción en tiempo real","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"Comandos 2","imagen":"https://cdn.cloudflare.steamstatic.com/steam/apps/1100410/capsule_616x353.jpg?t=1644232518","genero": "Estrategia", "fecha": "2000-05-07","popularidad":"10","descripcion":"Juego de Estrategia de Guerra","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"Battlefield 2042","imagen":"https://larepublica.pe/resizer/ZPTTkQNodvopfIiRP83U-Pq_GAw=/480x282/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/JK5B4UR7PRD3NLLN4VLOPHK3UA.jpg","genero": "Guerra", "fecha": "2021-05-07","popularidad":"04","descripcion":"Juego de Guerra....","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"Fifa 2022","imagen":"https://e00-co-marca.uecdn.es/claro/assets/multimedia/imagenes/2021/09/20/16321529886235.jpg","genero": "Deporte", "fecha": "2022-05-07","popularidad":"01","descripcion":"Juego de Futbol....","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"Ratchet And Clank","imagen":"https://i.blogs.es/14a7c2/et9shnvxaaim7oq/840_560.jpeg","genero": "Arcade", "fecha": "2022-05-07","popularidad":"06","descripcion":"Juego de Aventuras en el que....","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
      {"titulo":"Fortnite","imagen":"https://acf.geeknetic.es/imagenes/auto/20/09/09/czw-apple-fortnite-demanda-.jpg","genero": "Animación", "fecha": "2014-05-07","popularidad":"08","descripcion":"Juego Battle royale de 1 a 4 jugadores","createdAt":"2021-10-27","updatedAt":"2021-10-27"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('comunidads', null, {});
  }
};
