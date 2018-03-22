import { combineReducers } from 'redux';

// import reducers here
import { matchesHasErrored, matchesIsLoading, matches, usersMatched } from './matches';
import { recommendations, recommendationsHasErrored, recommendationsIsLoading, recommendationSubmitted } from './recommendations';
import ref from './ref';

export default combineReducers({
  matchesHasErrored,
  matchesIsLoading,
  matches,
  usersMatched,

  recommendations,
  recommendationsHasErrored,
  recommendationsIsLoading,
  recommendationSubmitted,

  ref,
});
