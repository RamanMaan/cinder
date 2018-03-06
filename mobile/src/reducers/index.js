import { combineReducers } from 'redux';

// import reducers here
import { matchesHasErrored, matchesIsLoading, matches } from './matches';
import { recommendations, recommendationsHasErrored, recommendationsIsLoading } from './recommendations';

export default combineReducers({
  matchesHasErrored,
  matchesIsLoading,
  matches,

  recommendations,
  recommendationsHasErrored,
  recommendationsIsLoading,
});
