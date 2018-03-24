import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';

const initState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token'),
  userID: localStorage.getItem('userID'),
  message: '',
  errored: false
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
        message: 'Login successful! Wait a moment...',
        token: action.payload.token,
        userID: action.payload.userID
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errored: true,
        message: action.payload
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: 'Signing up...'
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        message: 'Sign up successful! Wait a moment...',
        token: action.payload.token,
        userID: action.payload.userID
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errored: true,
        message: action.payload
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userID: null
      };

    default:
      return state;
  }
}
