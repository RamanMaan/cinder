import { combineReducers } from 'redux';

// import reducers here
import { exampleReducer } from './example';
import { matchesHasErrored, matchesIsLoading, matches } from './matches';

export default combineReducers({
  exampleReducer,
  matchesHasErrored,
  matchesIsLoading,
  matches
});
