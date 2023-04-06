import express from "express";
import { getPost, createPost, updatePost, deletePost, likePost } from "../Controllers/postControllers.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;