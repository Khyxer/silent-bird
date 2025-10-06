// principal
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// rutas
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import usersAccountsRoutes from "./routes/usersAccounts.routes.js";

// variables de entorno
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// middleware
app.use(express.json());

// conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// ====== rutas ======

// rutas de login. Registro, login etc
app.use("/api", userRoutes);

// rutas de posts
app.use("/api", postRoutes);

// rutas de sugerencias de cuentas
app.use("/api", usersAccountsRoutes);

// ====== servidor ======

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
