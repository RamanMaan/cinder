// import * as types from '../actions/actionTypes';
import {
  MATCHES_ERROR,
  MATCHES_LOADING,
  MATCHES_FETCH_SUCCESS,
  ONE_MATCH_FETCH_SUCCESS,
  CLEAR_ONE_MATCH
} from '../actions/actionTypes';

const initState = {
  loading: false,
  errored: false,
  message: '',
  matches: [],
  oneMatch: {}
};

export function match(state = initState, action) {
  switch (action.type) {
    case MATCHES_ERROR:
      return {
        ...state,
        loading: false,
        errored: true,
        message: action.payload
      };

    case MATCHES_LOADING:
      return {
        ...state,
        loading: true
      };

    case MATCHES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        matches: action.payload
      };

    case ONE_MATCH_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        oneMatch: action.payload
      };

    case CLEAR_ONE_MATCH:
      return {
        ...state,
        oneMatch: action.payload
      };

    default:
      return state;
  }
}
