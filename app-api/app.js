const express = require("express");
const bodyParser = require("body-parser"); // Necessário para interpretar o corpo das requisições HTTP
const cors = require("cors");
const ArtistaRoutes = require("./src/api/routes/ArtistaRoute")
const AlbumRoutes = require("./src/api/routes/AlbumRoute")
const app = express();
const ArtistaModel = require("./src/api/repositories/database/models/ArtistaR")
const MusicaModel = require("./src/api/repositories/database/models/Musica")
const AlbumModel = require("./src/api/repositories/database/models/Album")

//Configuração dos middlewares
app.use(cors());
app.use(bodyParser.json()); // Converterá qualquer corpo em JSON em um objeto javascript
app.use(ArtistaRoutes);
app.use(AlbumRoutes);

// Sincroniza os modelos com o banco de dados (cria tabelas necessárias), caso passe force: true, ele sobrescreve toda a tabela, apagando os
async function initSync() {
    ArtistaModel.sync({ force: false });
    MusicaModel.sync({ force: false });
    AlbumModel.sync({ force: false });
}

initSync()


//Exporta o aplicativo express configurado
module.exports = app;