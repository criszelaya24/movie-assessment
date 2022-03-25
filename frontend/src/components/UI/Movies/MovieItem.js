import React from 'react';

import Card from '../Card/Card';
import classes from './MovieItem.module.css';
import { useMovie } from '../../../store/hooks-store';

const MovieItem = React.memo(props => {
  const { setMovieStateDispatches } = useMovie();

  const toggleFavHandler = () => {
    if (!props.isFav) setMovieStateDispatches.addFavoriteMovie(props.id);
  };

  const toggleUnFavHandler = () => {
    if (props.isFav) setMovieStateDispatches.removeFavoriteMovie(props.id);
  }

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className={classes.movieItem}>
        <div className={classes.header}>
        <h2 className={props.isFav ? classes.isFav : ''}>{props.title}</h2>
        <h2>{props.date}</h2>
        </div>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={!props.isFav ? toggleFavHandler : toggleUnFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default MovieItem;
