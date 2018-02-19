import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { matchesHasErrored, matchesIsLoading, matches } from './matches';

export default combineReducers({
  routing: routerReducer,
  matches,
  matchesHasErrored,
  matchesIsLoading
});
