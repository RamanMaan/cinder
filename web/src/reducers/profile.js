import {
  PROFILE_ERROR,
  PROFILE_LOADING,
  PROFILE_FETCHED,
  SHOW_PROFILE,
  HIDE_PROFILE
} from '../actions/actionTypes';

const initState = {
  loading: false,
  errored: false,
  details: {},
  isVisible: false,
  message: ''
};

export function profile(state = initState, action) {
  switch (action.type) {
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errored: true,
        message: action.payload
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case PROFILE_FETCHED:
      return {
        ...state,
        loading: false,
        details: action.payload
      };

    case SHOW_PROFILE:
      return {
        ...state,
        isVisible: true
      };

    case HIDE_PROFILE:
      return {
        ...state,
        isVisible: false
      };

    default:
      return state;
  }
}
