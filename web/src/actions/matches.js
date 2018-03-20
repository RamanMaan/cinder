import {
  MATCHES_ERROR,
  MATCHES_LOADING,
  MATCHES_FETCH_SUCCESS,
  ONE_MATCH_FETCH_SUCCESS,
  CLEAR_ONE_MATCH
} from './actionTypes';

function matchesError(message) {
  return {
    type: MATCHES_ERROR,
    payload: message
  };
}

function matchesLoading() {
  return {
    type: MATCHES_LOADING
  };
}

function matchesFetchSuccess(matches) {
  return {
    type: MATCHES_FETCH_SUCCESS,
    payload: matches
  };
}

function oneMatchFetchSuccess(oneMatch) {
  return {
    type: ONE_MATCH_FETCH_SUCCESS,
    payload: oneMatch
  };
}

export function clearOneMatch() {
  return dispatch =>
    dispatch({
      type: CLEAR_ONE_MATCH,
      payload: {}
    });
}

export function fetchAllMatches(userID, token) {
  return dispatch => {
    dispatch(matchesLoading());
    fetch(`api/users/${userID}/matches`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then(data => dispatch(matchesFetchSuccess(data)))
      .catch(err => dispatch(matchesError(err)));
  };
}

export function fetchOneMatch(userID, matchID, token) {
  return dispatch => {
    dispatch(matchesLoading());
    fetch(`/api/users/${userID}/matches/${matchID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(res => {
        const match = {
          userID: res.userID,
          userName: res.userName,
          userPics: res.userPics,
          userAge: res.userAge,
          userGender: res.userGender,
          matchTime: new Date(),
          userBio: res.userBio ? res.userBio : 'No bio'
        };
        dispatch(oneMatchFetchSuccess(match));
      })
      .catch(err => dispatch(matchesError(err)));
  };
}
