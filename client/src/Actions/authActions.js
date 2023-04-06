import * as api from "../API/index.js";


export const signIn = (formData, navigate) => async (dispatch) => {
    try {

        navigate("/");
    } catch (error) {
        console.error(error);
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {

        navigate("/");
    } catch (error) {
        console.error(error);
    }
}