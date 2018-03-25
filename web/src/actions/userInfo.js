import {
  USER_INFO_ERROR,
  USER_INFO_LOADING,
  USER_INFO_FETCH_SUCCESS,
  USER_INFO_SAVE_SUCCESS
} from '../actions/actionTypes';

import { fetchRecommendations } from './recommendations';

function userInfoErrored(message) {
  return {
    type: USER_INFO_ERROR,
    payload: message
  };
}

function userInfoLoading() {
  return {
    type: USER_INFO_LOADING
  };
}

function userInfoFetchSuccess(data) {
  return {
    type: USER_INFO_FETCH_SUCCESS,
    payload: data
  };
}

function userInfoSaveSuccess(data) {
  return {
    type: USER_INFO_SAVE_SUCCESS,
    payload: data
  };
}

export function fetchUserInfo(userID, token) {
  return dispatch => {
    dispatch(userInfoLoading());
    fetch(`/api/users/${userID}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then(data => {
        if (data.filters.gender) {
          data.filters.gender.preference = data.filters.gender.preference.map(
            x => ({ label: x.genderName, value: x.genderID })
          );
        }
        return data;
      })
      .then(data => {
        dispatch(userInfoFetchSuccess(data));
      })
      .catch(err => dispatch(userInfoErrored(err.message)));
  };
}

export function saveUserInfo(user, token) {
  return dispatch => {
    dispatch(userInfoLoading());
    fetch(`/api/users/${user.userID}/profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(
        res =>
          res.ok
            ? dispatch(userInfoSaveSuccess(user))
            : new Error(res.statusText)
      )
      .then(() => dispatch(fetchRecommendations(user.userID, token)))
      .catch(err => dispatch(userInfoErrored(err.message)));
  };
}
