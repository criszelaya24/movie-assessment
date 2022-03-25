import { useEffect, useState } from 'react';
import MovieItem from '../../components/UI/Movies/MovieItem';
import { useMovie } from "../../store/hooks-store";
import classes from './Movies.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

const Favorites = props => {
  const { movieState = {}, setMovieStateDispatches } = useMovie();
  const { retrieving = true, favoritesMovies = [], error } = movieState
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    setMovieStateDispatches?.getFavMovies()
  }, []);

  useEffect(() => {
    if (!retrieving && favoritesMovies.length > 0) setIsLoading(false);
    if (!retrieving && favoritesMovies.length <= 0) {
      setIsLoading(false);
      setErrorMessage('Got no favorites yet!');
    }
    if (error && !retrieving) {
      setErrorMessage(error)
      setIsLoading(false)
    };

    if (!retrieving) setMovieStateDispatches?.getFavMovies();
  }, [ retrieving, favoritesMovies, error ])

  let content = null;

  if (isLoading && !favoritesMovies.length) content = <Spinner/>
  if (errorMessage)
    content = (
      <Modal show={errorMessage} modalClosed={ () => setErrorMessage(null)}>
        <h1>{errorMessage}</h1>
      </Modal>
    ) 
  if (favoritesMovies.length > 0) {
    content = (
      <ul className={classes.moviesList}>
        {favoritesMovies.map(movie => (
          <MovieItem key={movie.id}
          id={movie.id}
          title={movie.title}
          description={movie.overview}
          isFav={true}/>
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
