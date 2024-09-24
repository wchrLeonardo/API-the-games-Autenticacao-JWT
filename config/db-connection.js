// Importando o mongoose
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connect = () => {
  mongoose.connect(
    `${mongoURI}`
    
    // mongoURI,
    // {
    //   useNewUrlParser: false,
    //   useUnifiedTopology: false,
    // }
  );
};

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Erro ao conectar com o mongoDB.");
});

connection.on("open", () => {
  console.log("Conectado ao mongoDB com sucesso!");
});

connect();

export default mongoose;
