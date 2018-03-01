import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

function logger({ getState }) {
  return next => (action) => {
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
const middleware = [thunk, logger];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
