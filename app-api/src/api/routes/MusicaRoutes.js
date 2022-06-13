const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const MusicaController = require("../controllers/MusicaController");

const routes = Router();

// routes.post("/musica", verifyJWT, MusicaController.add);
// routes.get("/musica", verifyJWT, MusicaController.listAll);
// routes.get("/musica/:id", verifyJWT, MusicaController.getById);
// routes.get("/musica/:nome", verifyJWT, MusicaController.getByName);
// routes.get("/musica/:idAlbum", verifyJWT, MusicaController.getByAlbum);
// routes.get("/musica/:nomeArtista", verifyJWT, MusicaController.getByArtista);

// routes.delete("/musica/:id", verifyJWT, MusicaController.remove);

routes.post("/musica", MusicaController.add);
routes.get("/musica", MusicaController.listAll);
routes.get("/musica/:id", MusicaController.getById);
routes.get("/musica/:nome", MusicaController.getByName);
routes.get("/musica/:idAlbum", MusicaController.getByAlbum);
routes.get("/musica/:nomeArtista", MusicaController.getByArtista);
routes.delete("/musica/:id", MusicaController.remove);

module.exports = routes;