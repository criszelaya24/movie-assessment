import * as actionsTypes from "./actionsTypes";

// import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START

    };
};

export const authSucess = (token, userId) => {
    return {
        type: actionsTypes.AUTH_SUCESS,
        idToken: token,
        userId: userId
    };

};

export const authFail = (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionsTypes.AUTH_LOGOUT
    };
};

/* Validar  el tiempo del token */
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());

        }, expirationTime * 1000);

    };

};


/* redirecting the user to the checkout page */
export const setAuthRedirectPath = (path) => {
    return {
        type: actionsTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        dispatch(authSucess('response.data.idToken', 'response.data.localId'));
    };
};
