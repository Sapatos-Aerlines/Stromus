const {Router} = require("express");

const ArtistaController = require("../controllers/ArtistaController")

const routes = Router();

routes.get("/artista", ArtistaController.listAll);
routes.get("/artista/:artistaId", ArtistaController.get);
routes.post("/artista", ArtistaController.add);
routes.delete("/artista/:artistaId", ArtistaController.remove);

module.exports = routes;
