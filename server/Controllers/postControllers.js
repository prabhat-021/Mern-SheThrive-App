import PostMessage from "../Models/postMessage.js";

export const getPost = async (req, res) => {
    try {

        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const createPost = (req, res) => {
    res.send("this will create post")
}