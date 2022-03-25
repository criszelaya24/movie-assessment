import { useState, useEffect } from 'react';
import * as actions from '../actions/index'
import { useSelector, useDispatch } from 'react-redux';
export const useMovie = () => {

    const movieStateReducer = useSelector(state => state.movieReducer)
    const [movieState, setMovieState] = useState({});
    const dispatch = useDispatch();
    const setMovieStateDispatches = {
        // Need to paginate
        getMovies: (options = {}) => dispatch(actions.getMovies(options)),
        addFavoriteMovie: (id) => dispatch(actions.addFavoriteMovie(id)),
        removeFavoriteMovie: (id) => dispatch(actions.onRemoveFavoriteMovie(id)),
        getFavMovies: () => dispatch(actions.getFavMovies())
    }

    useEffect(() => {
        setMovieState({
            ...movieStateReducer
        })
    }, [ movieStateReducer ])

    return { movieState, setMovieStateDispatches }
}
