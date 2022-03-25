import * as actionsTypes from './actionsTypes';
import * as routes from '../../routes'
import axios from '../../axios';
import { updateUser } from './index'

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

export const addFavoriteMovieStart = () => {
    return {
        type: actionsTypes.MOVIES_SET_FAVORITE_START
    }
}

export const addFavoriteMovieEnd = () => {
    return {
        type: actionsTypes.MOVIES_SET_FAVORITE_END
    }
}

export const saveFavoriteMovie = (id) => {
    return {
        type: actionsTypes.MOVIES_SET_FAVORITE_SUCCESS,
        id
    }
}

export const addFavoriteMovieFailed = (error) => {
    return {
        type: actionsTypes.MOVIES_SET_FAVORITE_FAILED,
        error
    }
}
export const addFavoriteMovie = (id) => {
    return (dispatch, getState) => {
        const token = getState()?.authReducer?.token
        dispatch(addFavoriteMovieStart())
        const path = routes.movies.saveFavorite;
        axios.defaults.headers.common = {
            'Authorization': 'Bearer ' + token
        };
        axios.post(path, { id })
        .then(res => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.favoritesMovies = ([ ...new Set([ ...user.favoritesMovies, id ])])
            localStorage.setItem('user', JSON.stringify(user));
            console.log({ user })
            dispatch(updateUser(user))
            dispatch(saveFavoriteMovie(id))
            dispatch(addFavoriteMovieEnd())
        })
        .catch(error => {
            let errorData = error.response.data.error
            dispatch(addFavoriteMovieFailed(errorData))
            dispatch(moviesRetrieveEnd())
        })
    }
}
