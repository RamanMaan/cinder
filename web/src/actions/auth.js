import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './actionTypes';
import jwt from 'jsonwebtoken';

function loginError() {
  return {
    type: LOGIN_ERROR
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
          const token = res.token;
          const decoded = jwt.decode(token);
          const id = decoded.id;
          localStorage.setItem('token', token);
          localStorage.setItem('userID', id);
          dispatch(loginSuccess(id, token));
        } else {
          dispatch(loginError());
          throw new Error(`${res.status} ${res.err}`);
        }
      })
      .catch(err => {
        alert(err);
      });
  };
}
