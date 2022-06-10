const {Router} = require("express");

const AlbumController = require("../controllers/AlbumController")

const routes = Router();

routes.get("/album", AlbumController.listAll);
routes.get("/album/:id", AlbumController.getById);
routes.get("/album/:nome", AlbumController.getByName);
routes.get("/album/:nomeArtista", AlbumController.getByArtista);
routes.get("/album/:ano", AlbumController.getByAno);
routes.post("/album", AlbumController.add);
routes.delete("/album/:id", AlbumController.removeById);
routes.delete("/album/:nome", AlbumController.removeByName);

module.exports = routes;
