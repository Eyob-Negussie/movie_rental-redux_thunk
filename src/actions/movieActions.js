import { FETCH_MOVIES, FETCH_MOVIE } from "./types";
import { getMovies, getMovie } from "../services/movieService";

export const fetchMovies = () => dispatch => {
  getMovies().then(data => {
    return dispatch({
      type: FETCH_MOVIES,
      payload: data.data
    });
  });
};

export const fetchMovie = movieId => dispatch => {
  getMovie(movieId).then(data =>
    dispatch({
      type: FETCH_MOVIE,
      payload: data.data
    })
  );
};
