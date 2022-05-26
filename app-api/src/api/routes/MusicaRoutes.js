const {Router} = require("express");

const MusicaController = require("../controllers/MusicaController")

const routes = Router();

routes.get("/musica", MusicaController.listAll);
routes.get("/musica/:id", MusicaController.getById);
routes.get("/musica/:nome", MusicaController.getByName);
routes.get("/musica/:nomeArtista", MusicaController.getByArtista);
routes.post("/musica/:nomeArtista", MusicaController.add);
routes.delete("/musica/:id", MusicaController.removeById);
routes.delete("/musica/:nome", MusicaController.removeByName);

module.exports = routes;
