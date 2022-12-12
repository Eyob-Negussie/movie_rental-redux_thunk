import { FETCH_MOVIES, FETCH_MOVIE } from "../actions/types";
const intialState = { movies: [], movie: {} };

export default function(state = intialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      console.log("reducer...");
      return {
        ...state,
        movies: action.payload
      };
    case FETCH_MOVIE:
      console.log("movie reducer...");
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
}
