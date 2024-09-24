import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb";

// BUSCANDO TODOS OS JOGOS
const getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    // Cód. Status 200 - OK
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
// CADASTRANDO UM JOGO
const createGame = async (req, res) => {
  try {
    // DESESTRUTURAÇÃO
    const { title, year, price, descriptions } = req.body;
    await gameService.Create(title, year, price, descriptions);
    res.sendStatus(201); // Código 201 (CREATED)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
//DELETANDO UM JOGO
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      gameService.Delete(id);
      res.sendStatus(204); //Código:204 (NO CONTENT)
    } else {
      res.sendStatus(400); // Código: 400 (BAD REQUEST) - Requisição mal formada
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// ALTERANDO UM JOGO
const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      // DESESTRUTURAÇÃO
      // const title = req.body.title
      const { title, year, price, descriptions } = req.body;
      gameService.Update(id, title, year, price, descriptions);
      res.sendStatus(200); // Código 200 (OK)
    } else {
      res.sendStatus(400); // Código 400 (BAD REQUEST);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
// LISTANDO UM ÚNICO JOGO
const getOneGame = async (req, res) => {
  try {
    if(ObjectId.isValid(req.params.id)){
      const id = req.params.id
      const game = await gameService.getOne(id)
      if(!game){
        res.sendStatus(404) // Código 404 : NOT FOUND - Jogo não encontrado
      } else {
        res.status(200).json({ game })
      }
    } else {
      res.sendStatus(400) // Código 400 (BAD REQUEST): Requisição inválida
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}
export default { getAllGames, createGame, deleteGame, updateGame, getOneGame };
