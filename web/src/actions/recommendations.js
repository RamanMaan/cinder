import * as types from './actionTypes';
import { matchesFetchData } from './matches';

export function recErrored(bool) {
  return {
    type: types.REC_ERROR,
    error: bool
  };
}

export function recLoading(bool) {
  return {
    type: types.REC_LOADING,
    loading: bool
  };
}

export function recFetchSuccess(data) {
  return {
    type: types.REC_FETCH_SUCCESS,
    recommendations: data
  };
}

export function recSubmitSuccess(result) {
  return {
    type: types.REC_SUBMIT_SUCCESS,
    result
  };
}

export function fetchRecommendations(uri) {
  return dispatch => {
    dispatch(recLoading(true));

    fetch(uri)
      .then(res => {
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

export function submitRecommendation(currUserID, recID, like) {
  return dispatch => {
    const userAction = like ? 'like' : 'pass';

    fetch(`/api/users/${currUserID}/matches/${recID}/${userAction}`, {
      method: 'POST'
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        dispatch(recSubmitSuccess(data));
        if (data.matched) {
          dispatch(matchesFetchData(currUserID));
        }
      })
      .catch(() => dispatch(recErrored(true)));
  };
}

export function popRecommendation() {
  return {
    type: types.REC_POP
  };
}
