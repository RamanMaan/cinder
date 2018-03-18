import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';
// import Auth from '../utils/authService';

export function loginIsRequested(state = false, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return action.isAuthenticated;
    default:
      return state;
  }
}

export function loginHasErrored(state = 'Error', action) {
  switch (action.type) {
    case LOGIN_ERROR:
      return action.err;
    default:
      return state;
  }
}

export function logoutHasSucceeded(state = false, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return action.isAuthenticated;
    default:
      return state;
  }
}

export function loginHasSucceeded(state = false, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.isAuthenticated;
    default:
      return state;
  }
}
