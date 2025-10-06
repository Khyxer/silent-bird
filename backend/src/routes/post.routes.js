import { Router } from "express";
import {
  createPostController,
  getPostsController,
  likePostController,
} from "../controllers/post.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

// CREATE: Crear post
router.post("/post/create", authenticateToken, createPostController);

// GET: Obtener posts
router.get("/posts", getPostsController);

// LIKE: Dar o quitar like a un post
router.post("/post/like", authenticateToken, likePostController);

export default router;
