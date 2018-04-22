import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {i18nReducer} from 'react-redux-i18n';
import localeReducer from './locale.reducer';
import {authenticatedUserReducer} from './security.reducer';
import {singleNewsReducer, newsReducer, newsSeenByReducer, lastActiveTabReducer} from './news.reducer';
import {tempFilesReducer} from './temp-files.reducer';
import {usersReducer, userReducer, userRolesReducer} from './users.reducer';
import * as TagReducer from './tag.reducer';
import * as ActionTypes from '../actions/action-types.constants';

const appReducer = combineReducers({
	routing: routerReducer,
	currentLocale: localeReducer,
	i18n: i18nReducer,
	authenticatedUser: authenticatedUserReducer,
	singleNews: singleNewsReducer,
	tempFiles: tempFilesReducer,
	suggestedTags: TagReducer.suggestedTagsReducer,
	tags: TagReducer.tagsReducer,
	usersPerArticle:  newsSeenByReducer,
	news: newsReducer,
	activeTab: lastActiveTabReducer,
	users: usersReducer,
	user: userReducer,
	userRoles: userRolesReducer,
});

const rootReducer = (state, action) => {
	if (action.type === ActionTypes.LOGOUT_SUCCESS) {
		state = Object.assign({} , {
			// idle: state.idle,
			// loadingBar: state.loadingBar,
			i18n: state.i18n,
			routing: state.routing,
			currentLocale: state.currentLocale,
			// version: state.version,
		});
	}
	return appReducer(state, action);
};

export default rootReducer;