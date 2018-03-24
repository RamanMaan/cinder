import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_SUCCESS
} from './actionTypes';
import jwt from 'jsonwebtoken';

function loginError(err) {
  return {
    type: LOGIN_ERROR,
    payload: err
  };
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(userID, token) {
  return {
    type: LOGIN_SUCCESS,
    payload: { userID, token }
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

function signupError(err) {
  return {
    type: SIGNUP_ERROR,
    payload: err
  };
}

function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  };
}

function signupSuccess(userID, token) {
  return {
    type: SIGNUP_SUCCESS,
    payload: { userID, token }
  };
}

function setToken(token) {
  const decoded = jwt.decode(token);
  const id = decoded.id;
  localStorage.setItem('token', token);
  localStorage.setItem('userID', id);
  return id;
}

export function loginUser(creds) {
  return dispatch => {
    dispatch(loginRequest());
    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: creds.email,
        password: creds.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 200 && res.token) {
          dispatch(loginSuccess(setToken(res.token), res.token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => dispatch(loginError(err.message)));
  };
}

export function signupUser(creds) {
  return dispatch => {
    dispatch(signupRequest());
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: creds.email,
        password: creds.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 200 && res.token) {
          dispatch(signupSuccess(setToken(res.token), res.token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => dispatch(signupError(err.message)));
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    dispatch(logoutSuccess());
  };
}
