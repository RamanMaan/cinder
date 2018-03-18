import * as types from './actionTypes';

function loginError(err) {
  return {
    type: types.LOGIN_ERROR,
    err
  };
}

function loginRequest() {
  return {
    type: types.LOGIN_REQUEST,
    isAuthenticated: false
  };
}

function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
    isAuthenticated: true
  };
}

function logoutRequest() {
  return {
    type: types.LOGOUT_REQUEST,
    isAuthenticated: false
  };
}

function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
    isAuthenticated: true
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
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
        if (res.status === 200) {
          localStorage.setItem('token', res.token);
          dispatch(loginSuccess());
        } else {
          dispatch(loginError(res.err));
          throw new Error(`${res.staus} ${res.err}`);
        }
      })
      .catch(err => console.log(err));
  };
}
