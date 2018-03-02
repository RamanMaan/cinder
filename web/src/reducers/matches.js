import * as types from '../actions/actionTypes';

export function matchesHasErrored(state = false, action) {
  switch (action.type) {
    case types.MATCHES_ERROR:
      return action.error;

    default:
      return state;
  }
}

export function matchesIsLoading(state = false, action) {
  switch (action.type) {
    case types.MATCHES_LOADING:
      return action.loading;

    default:
      return state;
  }
}

export function matches(state = [], action) {
  switch (action.type) {
    case types.MATCHES_FETCH_SUCCESS:
      return action.matches;

    default:
      return state;
  }
}
