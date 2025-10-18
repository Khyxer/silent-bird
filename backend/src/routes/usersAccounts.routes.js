import { Router } from "express";
import {
  getSuggestedAccountsController,
  getUserProfileController,
  searchUserController,
} from "../controllers/usersAccounts.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

// SUGERENCIAS DE CUENTAS: ruta para obtener sugerencias de cuentas
router.get("/users/suggested-accounts", getSuggestedAccountsController);

// obtener datos de un usuario en especifico para ver su perfil
router.get("/user/profile", getUserProfileController);

// buscar usuarios
router.get("/user/search", searchUserController);

export default router;
