import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  sendMessageController,
  getMessagesController,
} from "../controllers/message.controllers.js";

const router = Router();

//enviar mensaje
router.post("/message/send", authenticateToken, sendMessageController);

//obtener mensajes
router.get("/messages", authenticateToken, getMessagesController);

export default router;
