const {Router} = require("express");
const {verifyJWT} = require("../middleware/AuthenticationMiddleware");
const CurtidaController = require("../controllers/CurtidaController");

const routes = Router();

routes.post("/curtida", verifyJWT, CurtidaController.add);

routes.get("/curtida", verifyJWT, CurtidaController.listAll);
routes.get("/curtida/:id", verifyJWT, CurtidaController.getById);

routes.delete("/curtida/:id", verifyJWT, CurtidaController.remove);

module.exports = routes;