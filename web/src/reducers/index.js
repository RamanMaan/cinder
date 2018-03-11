import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { matchesHasErrored, matchesIsLoading, matches } from './matches';
import {
  recommendationsHasErrored,
  recommendationsIsLoading,
  recommendationSubmitted,
  recommendations
} from './recommendations';
import {
  profile,
  profileHasErrored,
  profileIsLoading,
  profileView
} from './profile';

export default combineReducers({
  routing: routerReducer,

  matches,
  matchesHasErrored,
  matchesIsLoading,

  recommendations,
  recommendationSubmitted,
  recommendationsHasErrored,
  recommendationsIsLoading,

  profile,
  profileHasErrored,
  profileIsLoading,
  profileView
});
