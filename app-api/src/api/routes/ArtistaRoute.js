const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const ArtistaController = require("../controllers/ArtistaController")

const routes = Router();

routes.get("/artista", verifyJWT, ArtistaController.listAll);
routes.get("/artista/:artistaId", verifyJWT, ArtistaController.getById);
routes.get("/artista/:nome", verifyJWT, ArtistaController.getByName);
routes.post("/artista", verifyJWT, ArtistaController.add);
routes.delete("/artista/:id", verifyJWT, ArtistaController.remove);

module.exports = routes;
