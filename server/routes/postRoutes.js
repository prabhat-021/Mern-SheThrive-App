import express from "express";
import { getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPostsById, commentPost } from "../Controllers/postControllers.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", getPost);
router.get("/:id/id", getPostsById);
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
