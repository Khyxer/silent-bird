import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  getProfileController,
} from "../controllers/user.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

// REGISTRAR: ruta para registrar un usuario
router.post("/auth/register", registerUserController);

// LOGIN: ruta para iniciar sesión
router.post("/auth/login", loginUserController);

// VERIFICAR: Obtener información del usuario logueado
router.get("/auth/verify", authenticateToken, getProfileController);

export default router;
