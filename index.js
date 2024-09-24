import express from "express";
import dotenv from 'dotenv';
const app = express();
// Configurando arquivos dotenv
dotenv.config();

// import mongoose from "mongoose"
import mongoose from "./config/db-connection.js";
import Game from "./models/Games.js";
import User from "./models/Users.js";
import gameRoutes from "./routes/gameRoutes.js";
import userRoutes from "./routes/userRoutes.js";


// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", gameRoutes);
app.use("/", userRoutes);

// Iniciando a conexão com o MongoDB localmente
// mongoose.connect("mongodb://127.0.0.1:27017/api-thegames")




// Rodando a API na porta 4000
const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}.`);
});

