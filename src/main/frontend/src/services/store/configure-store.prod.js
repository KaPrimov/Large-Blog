import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import {middleware as idleMiddleware} from '../redux-idle-monitor/index';;

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk)// idleMiddleware)
	);
}
