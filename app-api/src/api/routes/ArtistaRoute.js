const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const ArtistaController = require("../controllers/ArtistaController")

const routes = Router();

routes.get("/artista", ArtistaController.listAll);
routes.get("/artista/:artistaId", ArtistaController.getById);
routes.get("/artista/:nome", ArtistaController.getByName);
routes.post("/artista", ArtistaController.add);
routes.delete("/artista/:id", ArtistaController.remove);

module.exports = routes;
