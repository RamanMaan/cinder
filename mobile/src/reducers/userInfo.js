import {
  USER_INFO_ERROR,
  USER_INFO_LOADING,
  USER_INFO_FETCH_SUCCESS,
} from '../actions/types';

const initState = {
  loading: false,
  errored: false,
  userInfo: {},
  message: '',
};

export default function userInfo(state = initState, action) {
  switch (action.type) {
    case USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        errored: true,
        message: action.payload,
      };

    case USER_INFO_LOADING:
      return {
        ...state,
        loading: true,
      };

    case USER_INFO_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    default:
      return state;
  }
}
