import {
  REC_ERROR,
  REC_LOADING,
  REC_FETCH_SUCCESS,
  REC_SUBMIT_SUCCESS,
  REC_POP
} from '../actions/actionTypes';
import { fetchAllMatches } from './matches';

function recErrored(message) {
  return {
    type: REC_ERROR,
    payload: message
  };
}

function recLoading() {
  return {
    type: REC_LOADING
  };
}

function recFetchSuccess(data) {
  return {
    type: REC_FETCH_SUCCESS,
    payload: data
  };
}

function recSubmitSuccess(result) {
  return {
    type: REC_SUBMIT_SUCCESS,
    payload: result
  };
}

export function fetchRecommendations(userID, token) {
  return dispatch => {
    dispatch(recLoading());

    fetch(`/api/users/${userID}/recs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then(data => dispatch(recFetchSuccess(data)))
      .catch(err => dispatch(recErrored(err.message)));
  };
}

export function submitRecommendation(userID, recID, like, token) {
  return dispatch => {
    const userAction = like ? 'like' : 'pass';

    fetch(`/api/users/${userID}/matches/${recID}/${userAction}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then(data => {
        dispatch(recSubmitSuccess(data));
        if (data.matched) dispatch(fetchAllMatches(userID, token));
      })
      .catch(err => dispatch(recErrored(err)));
  };
}

export function popRecommendation() {
  return dispatch => dispatch({ type: REC_POP });
}
