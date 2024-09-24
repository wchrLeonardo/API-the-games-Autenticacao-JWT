import express from 'express'
const gameRoutes = express.Router()
import gameController from '../controllers/gameController.js'
import Auth from '../middleware/Auth.js'

// Rotas - endpoints
// Endpoint para listar todos os jogos
gameRoutes.get("/games", Auth.Authorization, gameController.getAllGames)

// Endpoint para cadastrar um novo jogo
gameRoutes.post("/game", Auth.Authorization, gameController.createGame)

// Endpoint para deletar um jogo
gameRoutes.delete("/game/:id", Auth.Authorization, gameController.deleteGame)

// Endpoint para alterar um jogo
gameRoutes.put("/game/:id", Auth.Authorization, gameController.updateGame)

// Endpoint para listar um único jogo
gameRoutes.get("/game/:id", Auth.Authorization, gameController.getOneGame)

export default gameRoutes