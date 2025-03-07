import mongoose from "mongoose";
import PostMessage from "../Models/postMessage.js";

export const getPost = async (req, res) => {

    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {

    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {

        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With This Id");

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id }, { new: true });
    res.json(updatedPost);

}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With This Id");
    const deletedPost = await PostMessage.findByIdAndRemove(id);

    res.json(deletedPost);

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthorized User" })
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With This Id");

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // Like a Post
        post.likes.push(req.userId)
    } else {
        // Unlike a Post 
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });
        console.log(posts)
        res.json({ data: posts });
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

// export const get = async (req, res) => {
//     try {
//         const posts = await PostMessage.find();
//         res.json({ data: posts });
//     } catch (error) {
//         console.error("Error in getPostsBySearch:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

export const getPostsById = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const commentPost = async (req, res) => {

    const { id } = req.params;
    const { value } = req.body;

    try {
        const post = await PostMessage.findById(id);
        post.comments.push(value);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.json(updatedPost);
    } catch (error) {

        res.status(404).json({ message: error.message });

    }
}
