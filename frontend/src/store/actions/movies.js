import * as actionsTypes from './actionsTypes';
import * as routes from '../../routes'
import axios from '../../axios';

export const moviesRetrieveStart = () => {
    return {
        type: actionsTypes.MOVIES_RETRIEVE_START
    };
};

export const moviesRetrieveSuccess = (movies) => {
    return {
        type: actionsTypes.MOVIES_RETRIEVE_SUCCESS,
        movies
    };
};

export const moviesRetrieveFail = (error) => {
    return {
        type: actionsTypes.MOVIES_RETRIEVE_FAILED,
        error: error
    };
};

export const moviesRetrieveEnd = () => {
    return {
        type: actionsTypes.MOVIES_RETRIEVE_END
    };
};

export const getMovies = ({ page = 1}) => {
    return (dispatch, getState) => {
        const token = getState()?.authReducer?.token
        dispatch(moviesRetrieveStart())
        const path = routes.movies.nowReleased;
        axios.defaults.headers.common = {
            'Authorization': 'Bearer ' + token
        };
        axios.get(path, {
            page
        })
        .then(res => {
            const { results = []} = res?.data?.data
            dispatch(moviesRetrieveSuccess(results))
            dispatch(moviesRetrieveEnd())
        })
        .catch(error => {
            let errorData = error.response.data.error
            dispatch(moviesRetrieveFail(errorData))
            dispatch(moviesRetrieveEnd())
        })
    }
}
