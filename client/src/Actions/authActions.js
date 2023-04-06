import * as api from "../API/index.js";


export const signIn = (formData, navigate) => async (dispatch) => {

    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: "AUTH", payload: data });

        navigate("/");
    } catch (error) {

        console.error(error);
    }

}

export const signUp = (formData, navigate) => async (dispatch) => {

    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: "AUTH", payload: data });

        navigate("/");
    } catch (error) {

        console.error(error);
    }

}