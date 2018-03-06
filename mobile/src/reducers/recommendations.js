import types from '../actions';

export function recommendationsHasErrored(state = false, action) {
  switch (action.type) {
    case types.REC_ERROR:
      return action.error;

    default: return state;
  }
}

export function recommendationsIsLoading(state = false, action) {
  switch (action.type) {
    case types.REC_LOADING:
      return action.loading;

    default: return state;
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

    default: return state;
  }
}
