import { FETCH_GENRES } from "../actions/types";
const intialState = { genres: [] };

export default function(state = intialState, action) {
  switch (action.type) {
    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    default:
      return state;
  }
}
