const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const AlbumController = require("../controllers/AlbumController");

const routes = Router();

routes.post("/album", verifyJWT, AlbumController.add);
routes.get("/album", verifyJWT, AlbumController.listAll);
routes.get("/album/:id", verifyJWT, AlbumController.getById);
routes.get("/album/:ano", verifyJWT, AlbumController.getByAno);
routes.get("/album/:nome", verifyJWT, AlbumController.getByName);
routes.get("/album/:nomeArtista", verifyJWT, AlbumController.getByArtista);

routes.delete("/album/:id", verifyJWT, AlbumController.remove);

module.exports = routes;
