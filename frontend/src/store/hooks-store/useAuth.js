import { useState, useEffect } from 'react';
import * as actions from '../actions/index'
import { useSelector, useDispatch } from 'react-redux';
export const useAuth = () => {
    const authStateReducer = useSelector(state => state.authReducer)
    const [authState, setAuthState] = useState({});
    const dispatch = useDispatch();
    const setAuthStateDispatches = {
        onAuth: (authValues, isLogin) => dispatch(actions.auth(authValues, isLogin)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onLogout: () => dispatch(actions.logout()),
        onAutoLogin: () => dispatch (actions.authCheckState()),
    }

    useEffect(() => {
        setAuthState({
            ...authStateReducer,
            isAuthenticated: authStateReducer.token !== null})
    }, [ authStateReducer ])

    return { authState, setAuthStateDispatches }
}
