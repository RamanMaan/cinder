import types from '../actions';
import { serverURL, loggedInUser } from '../../env';

export function matchesErrored(bool) {
  return {
    type: types.MATCHES_ERROR,
    error: bool,
  };
}

export function matchesLoading(bool) {
  return {
    type: types.MATCHES_LOADING,
    loading: bool,
  };
}

export function matchesFetchSuccess(data) {
  return {
    type: types.MATCHES_FETCH_SUCCESS,
    matches: data,
  };
}

export function matchesFetchData() {
  return (dispatch) => {
    dispatch(matchesLoading(true));

    return fetch(`${serverURL}/api/users/${loggedInUser}/matches`)
      .then((res) => {
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

export function userMatchRedirected() {
  return {
    type: types.MATCHES_REDIRECTED,
  };
}

export function usersMatched(bool) {
  return (dispatch) => {
    if (bool) {
      dispatch(matchesFetchData());
    }

    dispatch({
      type: types.MATCHES_MATCHED,
      matched: bool,
    });
  };
}
