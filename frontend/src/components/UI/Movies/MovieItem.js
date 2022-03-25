import React from 'react';

import Card from '../Card/Card';
import classes from './MovieItem.module.css';

const MovieItem = React.memo(props => {
  // const dispatch = useStore(false)[1];

  // const toggleFavHandler = () => {
  //   // toggleFav(props.id);
  //   dispatch('TOGGLE_FAV', props.id);
  // };

  console.log( { props })

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className={classes.movieItem}>
        <h2 className={props.isFav ? classes.isFav : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={() => console.log('setFavorite')}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default MovieItem;
