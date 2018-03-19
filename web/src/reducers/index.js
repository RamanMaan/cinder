import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { match } from './matches';
import { recommendations } from './recommendations';
import { profile } from './profile';
import { auth } from './auth';

export default combineReducers({
  routing: routerReducer,
  match,
  rec: recommendations,
  profile,
  auth
});
