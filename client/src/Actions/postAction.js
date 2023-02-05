import * as api from "../API";

// Action Creators gग= are the function which return a function (action )
export const getPosts = () => async (dispatch) => {

    try {
        
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data });

    } catch (error) {
        console.error(error.message);
    }

}