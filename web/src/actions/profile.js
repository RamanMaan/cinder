import * as types from './actionTypes';
import Auth from '../utils/authService';

export function profileErrored(bool) {
  return {
    type: types.PROFILE_ERROR,
    error: bool
  };
}

export function profileLoading(bool) {
  return {
    type: types.PROFILE_LOADING,
    loading: bool
  };
}

export function profileFetched(data) {
  return {
    type: types.PROFILE_FETCHED,
    profile: data
  };
}

export function fetchProfile() {
  return dispatch => {
    dispatch(profileLoading(true));

    fetch(`/api/users/${Auth.userID}/`, {
      headers: { Authorization: `Bearer ${Auth.token}` }
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(profileLoading(false));
        return res.json();
      })
      .then(data => dispatch(profileFetched(data)))
      .catch(() => dispatch(profileErrored(true)));
  };
}

export function showProfile() {
  return {
    type: types.SHOW_PROFILE
  };
}

export function hideProfile() {
  return {
    type: types.HIDE_PROFILE
  };
}
