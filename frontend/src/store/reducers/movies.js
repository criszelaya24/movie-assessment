import * as actionsTypes from '../actions/actionsTypes';


const initialState = {
    movies: [],
    error: null,
    retrieving: false,
    moviesFavorite: []
};


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionsTypes.MOVIES_RETRIEVE_START:
            return {
                ...state,
                error: null,
                retrieving: true
            };

        case actionsTypes.MOVIES_RETRIEVE_SUCCESS:
            return {
                ...state,
                movies: action.movies,
                error: null,

            };
        case actionsTypes.MOVIES_RETRIEVE_FAILED:
            return {
                ...state,
                error: action.error,
            };
        case actionsTypes.MOVIES_RETRIEVE_END:
            return {
                ...state,
                retrieving: false
            };

        case actionsTypes.MOVIES_SET_FAVORITE_START:
            return {
                ...state,
                error: null,
                retrieving: true
            };

        case actionsTypes.MOVIES_SET_FAVORITE_SUCCESS:
            return {
                ...state,
                moviesFavorite: [...new Set([ ...state.moviesFavorite, action.id ])],
                retrieving: false,
                error: null,

            };
        case actionsTypes.MOVIES_SET_FAVORITE_FAILED:
            return {
                ...state,
                error: action.error,
            };
        case actionsTypes.MOVIES_SET_FAVORITE_END:
            return {
                ...state,
                retrieving: false
            };

        default:
            return state;
    }
};

export default reducer;