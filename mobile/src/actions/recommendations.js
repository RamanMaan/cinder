import types from '../actions';
import { serverURL, loggedInUser } from '../../env';

export function recErrored(bool) {
  return {
    type: types.REC_ERROR,
    error: bool,
  };
}

export function recLoading(bool) {
  return {
    type: types.REC_LOADING,
    loading: bool,
  };
}

export function recFetchSuccess(recommendations) {
  return {
    type: types.REC_FETCH_SUCCESS,
    recommendations,
  };
}

export function fetchRecommendations() {
  return (dispatch) => {
    dispatch(recLoading(true));

    fetch(`${serverURL}/api/users/${loggedInUser}/recommendations`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(recLoading(false));
        return res.json();
      })
      .then(data => dispatch(recFetchSuccess(data)))
      .catch(() => dispatch(recErrored(true)));
  };
}
