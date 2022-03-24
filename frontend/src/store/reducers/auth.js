import * as actionsTypes from '../actions/actionsTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    /* redirecting the user to the checkout page */
    authRedirectPath: '/'
};


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionsTypes.AUTH_START:
            return {
                ...state,
                error: null,
            };

        case actionsTypes.AUTH_SUCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,

            };
        case actionsTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
            };
        case actionsTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        /* redirecting the user to the checkout page */
        case actionsTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }

        default:
            return state;
    }
};

export default reducer;