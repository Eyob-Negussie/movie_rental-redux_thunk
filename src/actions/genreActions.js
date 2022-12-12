import { FETCH_GENRES } from "./types";
import { getGenres } from "../services/genreService";

export const fetchGenres = () => dispatch => {
  getGenres().then(data =>
    dispatch({
      type: FETCH_GENRES,
      payload: data.data
    })
  );
};
