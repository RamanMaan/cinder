import * as types from './actionTypes';

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

export function popRecommendation() {
  return {
    type: types.REC_POP
  };
}
