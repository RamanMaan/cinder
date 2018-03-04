import * as types from './types';
import { serverURL } from '../../env';

export function matchesErrored(bool) {
  return {
    type: types.MATCHES_ERROR,
    error: bool
  };
}

export function matchesLoading(bool) {
  return {
    type: types.MATCHES_LOADING,
    loading: bool
  };
}

export function matchesFetchSuccess(data) {
  return {
    type: types.MATCHES_FETCH_SUCCESS,
    matches: data
  };
}

export function matchesFetchData(userID) {
  return dispatch => {
    dispatch(matchesLoading(true));

    fetch(`${serverURL}/api/users/${userID}/matches`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(matchesLoading(false));
        return res.json();
      })
      .then(data => dispatch(matchesFetchSuccess(data)))
      .catch(() => dispatch(matchesErrored(true)));
  };
}
