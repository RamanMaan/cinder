import {
  FILTERS_ERROR,
  FILTERS_LOADING,
  FILTERS_FETCH_SUCCESS
} from '../actions/actionTypes';

function filtersErrored(message) {
  return {
    type: FILTERS_ERROR,
    payload: message
  };
}

function filtersLoading() {
  return {
    type: FILTERS_LOADING
  };
}

function filtersFetchSuccess(data) {
  return {
    type: FILTERS_FETCH_SUCCESS,
    payload: data
  };
}

export function fetchFilters(userID, token) {
  return dispatch => {
    dispatch(filtersLoading());
    fetch(`/api/users/${userID}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then(data => {
        dispatch(filtersFetchSuccess(data));
      })
      .catch(err => dispatch(filtersErrored(err.message)));
  };
}
