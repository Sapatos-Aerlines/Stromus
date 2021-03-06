const express = require("express");
const bodyParser = require("body-parser"); // Necessário para interpretar o corpo das requisições HTTP
const cors = require("cors");

const ArtistaRoutes = require("./src/api/routes/ArtistaRoute")
const AlbumRoutes = require("./src/api/routes/AlbumRoute")
const MusicaRoutes = require("./src/api/routes/MusicaRoute")
const PlaylistRoutes = require("./src/api/routes/PlaylistRoute")
const CurtidaRoutes = require("./src/api/routes/CurtidaRoute")

const app = express();

//Configuração dos middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json()); // Converterá qualquer corpo em JSON em um objeto javascript

app.use(AlbumRoutes);
app.use(MusicaRoutes);
app.use(ArtistaRoutes);
app.use(PlaylistRoutes);
app.use(CurtidaRoutes);

//Exporta o aplicativo express configurado
module.exports = app;