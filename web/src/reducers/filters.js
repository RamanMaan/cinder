import {
  FILTERS_ERROR,
  FILTERS_LOADING,
  FILTERS_FETCH_SUCCESS
} from '../actions/actionTypes';

const initState = {
  loading: false,
  errored: false,
  filters: {},
  isVisible: false,
  message: ''
};

export function filters(state = initState, action) {
  switch (action.type) {
    case FILTERS_ERROR:
      return {
        ...state,
        loading: false,
        errored: true,
        message: action.payload
      };

    case FILTERS_LOADING:
      return {
        ...state,
        loading: true
      };

    case FILTERS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        filters: action.payload
      };

    default:
      return state;
  }
}
