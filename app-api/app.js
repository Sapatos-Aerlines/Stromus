const express = require("express");
const bodyParser = require("body-parser"); // Necessário para interpretar o corpo das requisições HTTP
const cors = require("cors");
const ArtistaRoutes = require("./src/api/routes/ArtistaRoute")
const AlbumRoutes = require("./src/api/routes/AlbumRoute")
const app = express();

//Configuração dos middlewares
app.use(cors());
app.use(bodyParser.json()); // Converterá qualquer corpo em JSON em um objeto javascript
app.use(ArtistaRoutes);
app.use(AlbumRoutes);

//Exporta o aplicativo express configurado
module.exports = app;