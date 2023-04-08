import * as api from "../API/index.js";

// Action Creators are the function which return a function (action )
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data });

    } catch (error) {
        console.error(error);
    }

}

export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data });

    } catch (error) {
        console.error(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: "UPDATE", payload: data });

    } catch (error) {
        console.error(error);
    }
}

export const deletePost = (id) => async (dispatch) => {

    try {
        await api.deletePost(id);
        dispatch({ type: "DELETE", payload: id });

    } catch (error) {
        console.error(error);
    }
}

export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id);
        dispatch({ type: "LIKE", payload: data });

    } catch (error) {
        console.error(error);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {

    try {

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: "FETCH_BY_SEARCH", payload: data });

    } catch (error) {
        console.error(error);
    }
}
