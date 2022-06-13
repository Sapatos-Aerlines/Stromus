const { Router } = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const AlbumController = require("../controllers/AlbumController")

const routes = Router();

routes.post("/album", AlbumController.add);
routes.get("/album", AlbumController.listAll);
routes.get("/album/:id", AlbumController.getById);
routes.get("/album/:ano", AlbumController.getByAno);
routes.get("/album/:nome", AlbumController.getByName);
routes.get("/album/:nomeArtista", AlbumController.getByArtista);

routes.delete("/album/:id", AlbumController.remove);

module.exports = routes;
