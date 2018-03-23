import {
  USER_INFO_ERROR,
  USER_INFO_LOADING,
  USER_INFO_FETCH_SUCCESS,
} from './types';
import { serverURL } from '../../env';

function userInfoErrored(message) {
  return {
    type: USER_INFO_ERROR,
    payload: message,
  };
}

function userInfoLoading() {
  return {
    type: USER_INFO_LOADING,
  };
}

function userInfoFetchSuccess(data) {
  return {
    type: USER_INFO_FETCH_SUCCESS,
    payload: data,
  };
}

export function fetchUserInfo(userID) {
  return (dispatch) => {
    dispatch(userInfoLoading());
    fetch(`${serverURL}/api/users/${userID}`)
      .then(res => (res.ok ? res.json() : new Error(res.statusText)))
      .then((data) => {
        dispatch(userInfoFetchSuccess(data));
      })
      .catch(err => dispatch(userInfoErrored(err.message)));
  };
}
