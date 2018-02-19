import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

export const history = createHistory();

function logger({ getState }) {
  return next => action => {
    console.group(action.type);
    console.info('dispatching:', action);
    const result = next(action);
    console.log('next state:', getState());
    console.groupEnd();
    return result;
  };
}

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), logger];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
