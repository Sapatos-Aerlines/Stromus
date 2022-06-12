const { Router } = require("express");

const MusicaController = require("../controllers/MusicaController")

const routes = Router();

routes.post("/musica", MusicaController.add);
routes.get("/musica", MusicaController.listAll);
routes.get("/musica/:id", MusicaController.getById);
routes.get("/musica/:nome", MusicaController.getByName);
routes.get("/musica/:nomeArtista", MusicaController.getByArtista);

routes.delete("/musica/:id", MusicaController.remove);

module.exports = routes;
