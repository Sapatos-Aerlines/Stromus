const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const PlaylistController = require("../controllers/PlaylistController");

const routes = Router();

routes.post("/playlist", verifyJWT, PlaylistController.add);
routes.post("/playlist/update", PlaylistController.update);

routes.get("/playlist", verifyJWT, PlaylistController.listAll);
routes.get("/playlist/:id", verifyJWT, PlaylistController.getById);

routes.delete("/playlist/:id", verifyJWT, PlaylistController.remove);

module.exports = routes;