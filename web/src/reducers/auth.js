import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../actions/actionTypes';

const initState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token'),
  userID: localStorage.getItem('userID'),
  message: ''
};

export function auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: 'Logging in...'
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        message: 'Login Successful! Wait a moment...',
        token: action.payload.token,
        userID: action.payload.userID
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: 'Log in'
      };

    default:
      return state;
  }
}
