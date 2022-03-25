import * as actionsTypes from '../actions/actionsTypes';


const initialState = {
    movies: [],
    error: null,
    retrieving: false,
    favoritesMovies: []
};


const reducer = (state = initialState, action) => {

    switch (action.type) {
        
        case actionsTypes.MOVIES_REMOVE_FAVORITE_SUCCESS:
        case actionsTypes.FAV_MOVIES_RETRIEVE_START:
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
        case actionsTypes.FAV_MOVIES_RETRIEVE_FAILED:
        case actionsTypes.MOVIES_RETRIEVE_FAILED:
            return {
                ...state,
                error: action.error,
            };
        case actionsTypes.FAV_MOVIES_RETRIEVE_END:
        case actionsTypes.MOVIES_RETRIEVE_END:
            return {
                ...state,
                retrieving: false
            };
        case actionsTypes.MOVIES_REMOVE_FAVORITE_START:
        case actionsTypes.MOVIES_SET_FAVORITE_START:
            return {
                ...state,
                error: null,
                retrieving: true
            };

        case actionsTypes.FAV_MOVIES_RETRIEVE_SUCCESS:
        case actionsTypes.MOVIES_SET_FAVORITE_SUCCESS:
            return {
                ...state,
                favoritesMovies: action.moviesFavorite,
                retrieving: false,
                error: null,

            };
        case actionsTypes.MOVIES_REMOVE_FAVORITE_FAILED:
        case actionsTypes.MOVIES_SET_FAVORITE_FAILED:
            return {
                ...state,
                error: action.error,
            };
        case actionsTypes.MOVIES_REMOVE_FAVORITE_END:
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