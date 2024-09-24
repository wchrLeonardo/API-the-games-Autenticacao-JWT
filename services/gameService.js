import Game from "../models/Games.js";

class gameService {
  // Padrão async/await
  // Método para buscar todos os jogos
  async getAll() {
    try {
      const games = await Game.find();
      return games;
    } catch (error) {
      console.log(error);
    }
  }
  // Método para cadastrar um jogo
  async Create(title, year, price, descriptions) {
    try {
      const newGame = new Game({
        title,
        year,
        price,
        descriptions
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }
  // Método para deletar um jogo
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com id: ${id} foi deletado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }
  // Método para alterar um jogo
  async Update(id, title, year, price, descriptions) {
    try {
      await Game.findByIdAndUpdate(id, {
        // title : title
        title,
        year,
        price,
        descriptions
      });
      console.log(`Dados do game com id: ${id} alterado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }
  // Método para listar um único jogo
  async getOne(id) {
    try {
      const game = await Game.findOne({_id: id})
      return game
    } catch (error) {
      console.log(error)
    }
  }
}
export default new gameService();
