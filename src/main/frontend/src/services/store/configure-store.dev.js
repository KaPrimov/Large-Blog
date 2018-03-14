import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { middleware as idleMiddleware } from '../redux-idle-monitor/index';
import { actions as idleActions } from '../redux-idle-monitor/index';

const logger = createLogger();
export default function configureStore(initialState) {
  let store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk,
        //idleMiddleware,
        reduxImmutableStateInvariant({ignore: 'report.expenses'}), logger)
  );

  return store;
}
