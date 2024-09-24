import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

// Função de Autenticação com JWT - Json Web Token
const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, userController.JWTSecret, (error, data) => {
      if (error) {
        res.status(401);
        res.json({ error: "Token inválido!" });
      } else {
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ error: "Token inválido!" });
  }
};
export default { Authorization }
