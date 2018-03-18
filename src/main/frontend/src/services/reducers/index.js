import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import localeReducer from './';

const appReducer = combineReducers({
    routing: routerReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;