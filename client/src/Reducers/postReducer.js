export const postReducer = (state = { posts: [] }, action) => {
    switch (action.type) {

        case "FETCH_ALL":
            return {
                ...state,
                posts: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
                currentPage: action.payload.currentPage
            }

        case "FETCH_BY_SEARCH":
            return {
                ...state, posts: action.payload
            };

        case "LIKE":
        case "UPDATE":
            return state.map((post) => post._id === action.payload._id ? action.payload : post);

        case "CREATE":
            return [...state, action.payload];

        case "DELETE":
            return state.filter((post) => post._id !== action.payload);

        default:
            return state;
    }
}