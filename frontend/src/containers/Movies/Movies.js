// import React, { useContext } from 'react';

import MovieItem from '../../components/UI/Movies/MovieItem';
import classes from './Movies.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import { useEffect, useState } from "react";
import { useMovie, useAuth } from "../../store/hooks-store";
import { auth } from '../../routes';

const Movies = () => {
  const { movieState = {}, setMovieStateDispatches } = useMovie();
  const { authState = {} } = useAuth()
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');
  const { retrieving = true, movies = [], error } = movieState
  const { user } = authState

  useEffect(() => {
      setMovieStateDispatches?.getMovies()
  }, []);

  useEffect(() => {
    if (!retrieving && movies.length > 0) setIsLoading(false)
  }, [ retrieving, movies ])

  useEffect(() => {
    if (error && !retrieving) {
      setErrorMessage(error)
      setIsLoading(false)
    };
  }, [ error, retrieving] )

  const checkFavoriteMovie = (id) => {
    if (!user) return false

    return user.favoritesMovies.filter(movie => movie === id).length > 0
  }

  const spinner = isLoading ? <Spinner/> : null
  const moviesToRender = movies.map(movie => (
    <MovieItem key={movie.id}
                id={movie.id}
                date={movie.release_date}
                title={movie.title}
                description={movie.overview}
                isFav={checkFavoriteMovie(movie.id)}/>
    ))

  return (
    <>
      <Modal show={errorMessage} modalClosed={ () => setErrorMessage(null)}>
        <h1>{errorMessage}</h1>
      </Modal>
      { spinner }
      <ul className={classes.moviesList}>
      { moviesToRender }
    </ul>
    </>
  );
};

export default Movies;
