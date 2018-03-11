import types from '../actions';
import { usersMatched } from './matches';
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

export function recSubmitSuccess(result) {
  return {
    type: types.REC_SUBMIT_SUCCESS,
    result,
  };
}

export function fetchRecommendations() {
  return (dispatch) => {
    dispatch(recLoading(true));

    fetch(`${serverURL}/api/users/${loggedInUser}/recs`)
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

export function submitRecommendation(recID, action) {
  return (dispatch) => {
    fetch(`${serverURL}/api/users/${loggedInUser}/matches/${recID}/${action}`, {
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(recSubmitSuccess(data));
        dispatch(usersMatched(data.matched === 'true'));
      })
      .catch(() => dispatch(recErrored(true)));
  };
}
