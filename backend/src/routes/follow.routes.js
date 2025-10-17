import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { followUserController } from "../controllers/follow.controllers.js";

const router = Router();

/**
 * FOLLOW: Seguir a un usuario
 * @access Private
 * @param {string} usernameToFollow - nombre de usuario del usuario a seguir (query)
 */
router.post("/follow", authenticateToken, followUserController);

export default router;
