import {
  PROFILE_ERROR,
  PROFILE_LOADING,
  PROFILE_FETCHED,
  SHOW_PROFILE,
  HIDE_PROFILE
} from '../actions/actionTypes';

function profileErrored(message) {
  return {
    type: PROFILE_ERROR,
    payload: message
  };
}

function profileLoading() {
  return {
    type: PROFILE_LOADING
  };
}

function profileFetched(data) {
  return {
    type: PROFILE_FETCHED,
    payload: data
  };
}

export function fetchProfile(userID, token) {
  return dispatch => {
    dispatch(profileLoading());
    fetch(`/api/users/${userID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then(data => {
        dispatch(profileFetched(data));
      })
      .catch(err => dispatch(profileErrored(err)));
  };
}

export function showProfile() {
  return dispatch =>
    dispatch({
      type: SHOW_PROFILE
    });
}

export function hideProfile() {
  return dispatch =>
    dispatch({
      type: HIDE_PROFILE
    });
}
