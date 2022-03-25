// import React, { useContext } from 'react';

import MovieItem from '../../components/UI/Movies/MovieItem';
import classes from './Movies.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import { useEffect, useState } from "react";
import { useMovie } from "../../store/hooks-store";

const Movies = () => {
  const { movieState, setMovieStateDispatches } = useMovie();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');
  const { retrieving = true, movies = [], error } = movieState

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

  const spinner = isLoading ? <Spinner/> : null
  const moviesToRender = movies.map(movie => (
    <MovieItem key={movie.id}
                id={movie.id}
                title={movie.title}
                description={movie.overview}
                isFav={true}/>
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
