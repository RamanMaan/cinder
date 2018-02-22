import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { matchesHasErrored, matchesIsLoading, matches } from './matches';
import {
  recommendationsHasErrored,
  recommendationsIsLoading,
  recommendationSubmitted,
  recommendations
} from './recommendations';

export default combineReducers({
  routing: routerReducer,

  matches,
  matchesHasErrored,
  matchesIsLoading,

  recommendations,
  recommendationSubmitted,
  recommendationsHasErrored,
  recommendationsIsLoading
});
