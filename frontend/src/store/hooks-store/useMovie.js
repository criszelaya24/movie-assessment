import { useState, useEffect } from 'react';
import * as actions from '../actions/index'
import { useSelector, useDispatch } from 'react-redux';
export const useMovie = () => {

    const movieStateReducer = useSelector(state => state.movieReducer)
    const [movieState, setMovieState] = useState({});
    const dispatch = useDispatch();
    const setMovieStateDispatches = {
        getMovies: (options = {}) => dispatch(actions.getMovies(options)),
        addFavoriteMovie: (id) => dispatch(actions.addFavoriteMovie(id))
    }

    useEffect(() => {
        setMovieState({
            ...movieStateReducer
        })
    }, [ movieStateReducer ])

    return { movieState, setMovieStateDispatches }
}
