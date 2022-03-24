import { useState, useEffect } from 'react';
import * as actions from '../actions/index'
import { useSelector, useDispatch } from 'react-redux';
export const useAuth = () => {
    const authStateReducer = useSelector(state => state.authReducer)
    const [authState, setAuthState] = useState({});
    const dispatch = useDispatch();
    const setAuthDispatches = {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onLogout: () => dispatch(actions.logout()),
        onAutoLogin: () => dispatch (actions.authCheckState()),
    }

    useEffect(() => {
        setAuthState({
            ...authStateReducer,
            isAuthenticated: authStateReducer.token !== null})
    }, [ authStateReducer ])

    return [ authState, setAuthDispatches ]
}
