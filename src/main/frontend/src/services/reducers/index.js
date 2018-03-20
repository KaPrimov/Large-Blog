import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {i18nReducer} from 'react-redux-i18n';
import localeReducer from './locale.reducer';
import {authenticatedUserReducer} from './security.reducer';

const appReducer = combineReducers({
	routing: routerReducer,
	currentLocale: localeReducer,
	i18n: i18nReducer,
	authneticatedUser: authenticatedUserReducer
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;