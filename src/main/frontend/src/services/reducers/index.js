import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {i18nReducer} from 'react-redux-i18n';
import localeReducer from './locale.reducer';
import {authenticatedUserReducer} from './security.reducer';
import * as ActionTypes from '../actions/action-types.constants';

const appReducer = combineReducers({
	routing: routerReducer,
	currentLocale: localeReducer,
	i18n: i18nReducer,
	authenticatedUser: authenticatedUserReducer
});

const rootReducer = (state, action) => {
	if (action.type === ActionTypes.LOGOUT_SUCCESS) {
		state = Object.assign({} , {
			idle: state.idle,
			loadingBar: state.loadingBar,
			i18n: state.i18n,
			routing: state.routing,
			currentLocale: state.currentLocale,
			version: state.version,
		});
	}
	return appReducer(state, action);
};

export default rootReducer;