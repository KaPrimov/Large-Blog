import * as ActionTypes from './action-types.constants';

/* ------------------------------ Public API ------------------------------- */
/**
 * @component: ListNewsPageContainer
 * @url-page: /news
 */
export function clearListNewsStates() {
	return function(dispatch) {
		dispatch({type: ActionTypes.CLEAR_NEWS_CONTEXT});
	};
}
/**
 * @component: CreateNewsContainer
 * @url-page: /news/create
 */
export function clearCreateNewsStates() {
	return function(dispatch) {
		dispatch({type: ActionTypes.CLEAR_CREATE_NEWS_CONTEXT});
		dispatch({type: ActionTypes.CLEAR_CREATE_TAGS_CONTEXT});
		dispatch({type: ActionTypes.CLEAR_TEMP_FILES_CONTEXT});
	};
}

/**
 * @component: CreateNewsContainer
 * @url-page: /news/edit
 */
export function clearTempFilesStates() {
	return function(dispatch) {
		dispatch({type: ActionTypes.CLEAR_TEMP_FILES_CONTEXT});
		dispatch({type: ActionTypes.CLEAR_CREATE_NEWS_CONTEXT});
	};
}

/**
 * @component: ListUsers
 * @url-page: /admin
 */
export function clearAdminUsersStates() {
	return function(dispatch) {
		dispatch({type: ActionTypes.CLEAR_USERS_CONTEXT});
	};
}