const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const ArtistaController = require("../controllers/ArtistaController");

const routes = Router();

routes.post("/artista", verifyJWT, ArtistaController.add);
routes.post("/artista/update", ArtistaController.update);

routes.get("/artista", verifyJWT, ArtistaController.listAll);
routes.get("/artista/:nome", verifyJWT, ArtistaController.getByName);
routes.get("/artista/:artistaId", verifyJWT, ArtistaController.getById);

routes.delete("/artista/:id", verifyJWT, ArtistaController.remove);

module.exports = routes;
