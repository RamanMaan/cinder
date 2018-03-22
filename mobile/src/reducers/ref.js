import * as types from '../actions/types';

const initState = {
  loading: false,
  errored: false,
  ref: [],
};

export default function ref(state = initState, action) {
  switch (action.type) {
    case types.REF_ERROR:
      return {
        ...state,
        loading: false,
        errored: true,
      };

    case types.REF_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.REF_FETCHED:
      return {
        ...state,
        loading: false,
        ref: action.ref,
      };

    default: return state;
  }
}
