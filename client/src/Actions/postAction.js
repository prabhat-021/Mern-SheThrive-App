import * as api from "../API/index.js";

// Action Creators are the function which return a function (action )
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data });

    } catch (error) {
        console.error(error.message);
    }

}

export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data });

    } catch (error) {
        console.error(error.message);
    }
}

export const updatePost = (post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(post);
        dispatch({ type: "CREATE", payload: data });

    } catch (error) {
        console.error(error.message);
        
    }
}