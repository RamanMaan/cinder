export function matchesHasErrored(state = false, action) {
  switch (action.type) {
    case 'MATCHES_ERROR':
      return action.error;

    default:
      return state;
  }
}

export function matchesIsLoading(state = false, action) {
  switch (action.type) {
    case 'MATCHES_LOADING':
      return action.loading;

    default:
      return state;
  }
}

export function matches(state = [], action) {
  switch (action.type) {
    case 'MATCHES_FETCH_SUCCESS':
      return action.matches;

    default:
      return state;
  }
}
