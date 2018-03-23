import { SHOW_PROFILE, HIDE_PROFILE } from '../actions/actionTypes';

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
