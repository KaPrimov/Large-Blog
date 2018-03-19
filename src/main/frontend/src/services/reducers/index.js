import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import localeReducer from './locale.reducer';
import {i18nReducer} from 'react-redux-i18n';

const appReducer = combineReducers({
	routing: routerReducer,
	currentLocale: localeReducer,
	i18n: i18nReducer,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;