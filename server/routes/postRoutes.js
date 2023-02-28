import express from "express";
import { getPost, createPost, updatePost } from "../Controllers/postControllers.js";

const router = express.Router();

router.get("/", getPost);
router.post("/", createPost);
router.patch("/:id",updatePost);

export default router;