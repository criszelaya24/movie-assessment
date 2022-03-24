import * as actionsTypes from './actionsTypes';
import * as routes from '../../routes'
import axios from '../../axios';
const tokenDuration = Number(process.env.REACT_APP_TOKEN_DURATION) || 2880000

// import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START

    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        idToken: token,
        userId
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

        }, expirationTime);

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

        axios.post(path, authValues)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() +  tokenDuration)
                const token = response.data.token
                const userId = response.data.user._id
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', userId);
                dispatch(authSuccess(token, userId));
                // dispatch(checkAuthTimeout(tokenDuration));
            })
            .catch(error => {
                const errors = [];
                let errorData = error.response.data.error
                if (typeof errorData === 'object') {
                    Object.keys(errorData).forEach(error => {
                        errors.push(`${error}: ${errorData[error]}`)
                    })
                    errorData = null
                }
                dispatch(authFail( errorData || errors.join(' / ')))
            })
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
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));  

            }   
        } 
    };
};