import * as types from '../actions/actionTypes';

export function profileHasErrored(state = false, action) {
  switch (action.type) {
    case types.PROFILE_ERROR:
      return action.error;

    default:
      return state;
  }
}

export function profileIsLoading(state = false, action) {
  switch (action.type) {
    case types.PROFILE_LOADING:
      return action.loading;

    default:
      return state;
  }
}

export function profile(state = null, action) {
  switch (action.type) {
    case types.PROFILE_FETCHED:
      return action.profile;

    default:
      return state;
  }
}

export function profileView(state = false, action) {
  switch (action.type) {
    case types.SHOW_PROFILE:
      return true;

    case types.HIDE_PROFILE:
      return false;

    default:
      return state;
  }
}
