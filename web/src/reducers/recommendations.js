import {
  REC_ERROR,
  REC_LOADING,
  REC_FETCH_SUCCESS,
  REC_SUBMIT_SUCCESS,
  REC_POP
} from '../actions/actionTypes';

const initState = {
  message: '',
  recommendations: [],
  loading: false,
  errored: false,
  submitResult: {}
};

export function recommendations(state = initState, action) {
  switch (action.type) {
    case REC_ERROR:
      return {
        ...state,
        errored: true,
        loading: false,
        message: action.payload
      };

    case REC_LOADING:
      return {
        ...state,
        loading: true
      };

    case REC_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        recommendations: action.payload
      };

    case REC_SUBMIT_SUCCESS:
      return {
        ...state,
        submitResult: action.payload
      };

    case REC_POP:
      return {
        ...state,
        recommendations: state.recommendations.slice(1)
      };
    default:
      return state;
  }
}
