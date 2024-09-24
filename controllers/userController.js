import userService from "../services/userService.js";
import jwt from "jsonwebtoken";
const JWTSecret = "apigamessecret";

// Cadastrando um Usuário
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userService.Create(name, email, password);
    res.sendStatus(201); // Cód. 201 (CREATED)
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Erro interno do servidor
  }
};

// Login do usuário
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // E-mail válido
    if (email != undefined) {
      const user = await userService.getOne(email);
      // Usuário foi encontrado
      if (user != undefined) {
        // res.json({ login: "Login realizado com sucesso!" });
        // Senha correta
        if (user.password == password) {
          jwt.sign(
            { id: user._id, email: user.email },
            JWTSecret,
            { expiresIn: "48h" },
            (error, token) => {
              if (error) {
                res.status(400); // Bad Request
                res.json({ error: "Falha interna." });
              } else {
                res.status(200); // Código OK
                res.json({ token: token });
              }
            }
          );
        // Senha incorreta
        } else {
          res.status(401) // Unauthorized - Não autorizado
          res.json({error: "Credenciais inválidas!"})
        }
      // Usuário não encontrado
      } else {
        res.status(404) // Not found - Usuário não encontrado
        res.json({error: "O e-mail enviado não foi encontrado."})
      }
    // E-mail inválido
    } else {
      res.status(400) // Bad request - Requisição mal formada
      res.json({error: "O e-mail enviado é inválido."})
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Erro interno do servidor
  }
};

export default { createUser, loginUser, JWTSecret };
