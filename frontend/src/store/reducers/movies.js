import * as actionsTypes from '../actions/actionsTypes';


const initialState = {
    movies: [],
    error: null,
    retrieving: false
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
                error: null,
                retrieving: false
            };

        default:
            return state;
    }
};

export default reducer;