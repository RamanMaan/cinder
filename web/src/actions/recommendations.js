import * as types from './actionTypes';

export function errored(bool) {
  return {
    type: types.REC_ERROR,
    error: bool
  };
}

export function loading(bool) {
  return {
    type: types.REC_LOADING,
    loading: bool
  };
}

export function fetchSuccess(data) {
  return {
    type: types.REC_FETCH_SUCCESS,
    recommendations: data
  };
}

export function fetchRecommendations(uri) {
  return dispatch => {
    dispatch(loading(true));

    fetch(uri)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(loading(false));
        return res.json();
      })
      .then(data => dispatch(fetchSuccess(data)))
      .catch(() => dispatch(errored(true)));
  };
}

export function popRecommendation() {
  return {
    type: types.REC_POP
  };
}
