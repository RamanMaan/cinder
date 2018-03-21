import { SHOW_PROFILE, HIDE_PROFILE } from '../actions/actionTypes';

const initState = {
  isVisible: false
};

export function profileDisplay(state = initState, action) {
  switch (action.type) {
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
