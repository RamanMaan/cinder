import * as types from '../actions/actionTypes';

export function recommendationsHasErrored(state = false, action) {
  switch (action.type) {
    case types.REC_ERROR:
      return action.error;

    default:
      return state;
  }
}

export function recommendationsIsLoading(state = false, action) {
  switch (action.type) {
    case types.REC_LOADING:
      return action.loading;

    default:
      return state;
  }
}

export function recommendationSubmitted(state = false, action) {
  switch (action.type) {
    case types.REC_SUBMIT_SUCCESS:
      return action.result;

    default:
      return state;
  }
}

export function recommendations(state = [], action) {
  switch (action.type) {
    case types.REC_FETCH_SUCCESS:
      return action.recommendations;

    case types.REC_POP:
      return state.slice(1);

    default:
      return state;
  }
}
