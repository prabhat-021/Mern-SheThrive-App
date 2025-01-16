import axios from "axios";

const url = "https://mern-she-thrive-app.vercel.app/posts";

axios.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return req;
});

// POST 

export const fetchPosts = (page) => axios.get(`${url}?page=${page}`);
export const fetchPostsById = (id) => axios.get(`${url}/${id}/id`);
export const fetchPostsBySearch = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || "none" }&tags=${searchQuery.tags}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const comment = (value, id) => axios.post(`${url}/${id}/commentPost`, { value })

//  USER 

export const signIn = (formData) => axios.post(`${url}/user/signin`, formData);
export const signUp = (formData) => axios.post(`${url}/user/signun`, formData);
