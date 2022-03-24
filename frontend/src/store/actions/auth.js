import * as actionsTypes from './actionsTypes';
import * as routes from '../../routes'
import axios from '../../axios';

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


export const auth = (authValues, isLogin) => {
    return dispatch => {
        dispatch(authStart());
        const path = isLogin ? routes.auth.login : routes.auth.register

        setTimeout(async () => {

            // dispatch(authFail('Testing Error Modal'))
        }, 1000)


        // dispatch(authSucess('response.data.idToken', 'response.data.localId'));
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSucess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));  

            }   
        } 
    };
};