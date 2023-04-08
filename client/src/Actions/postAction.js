import * as api from "../API/index.js";

// Action Creators are the function which return a function (action )
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: "START_LOADING" });

        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
        dispatch({ type: "FETCH_ALL", payload: { data, currentPage, numberOfPages } });

        dispatch({ type: "END_LOADING" });
    } catch (error) {
        console.error(error);
    }

}

export const createPost = (post) => async (dispatch) => {

    try {
        dispatch({ type: "START_LOADING" });

        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data });

        dispatch({ type: "END_LOADING" });

    } catch (error) {
        console.error(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {

    try {
        dispatch({ type: "START_LOADING" });

        const { data } = await api.updatePost(id, post);
        console.log(data);
        dispatch({ type: "UPDATE", payload: data });

        dispatch({ type: "END_LOADING" });

    } catch (error) {
        console.error(error);
    }
}

export const deletePost = (id) => async (dispatch) => {

    try {
        dispatch({ type: "START_LOADING" });

        await api.deletePost(id);
        dispatch({ type: "DELETE", payload: id });

        dispatch({ type: "END_LOADING" });

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
        dispatch({ type: "START_LOADING" });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: "FETCH_BY_SEARCH", payload: { data } });

        dispatch({ type: "END_LOADING" });
    } catch (error) {
        console.error(error);
    }
}
