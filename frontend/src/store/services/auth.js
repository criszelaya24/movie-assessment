import { connect } from 'react-redux'

import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading, 
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        authRedirectPath: state.authReducer.authRedirectPath ,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onLogout: ()=> dispatch(actions.logout()),
        onAutoLogin: () => dispatch (actions.authCheckState())
    };
}

export const auth = connect(
    mapStateToProps, mapDispatchToProps
)
