import * as ActionTypes from './action-types.constants';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import SecurityAPI from '../api/security.api';
import NotificationService from '../../services/services/notification.service';
import UserErrorMessageCodeHandler from '../error-handlers/user-error-handler';
import {I18n} from 'react-redux-i18n';

/* ------------------------------ Public API ------------------------------- */
/**
 * login user and save it in the reducer
 */
export function loginUser(userData) {
	return function(dispatch) {
		dispatch(showLoading());
		return SecurityAPI.loginUser(userData).then(() => {
			SecurityAPI.getLoggedInUser().then(authenticatedUser => {
				if (authenticatedUser) {
					NotificationService.notifySuccess(I18n.t('user_actions.login_success'));
					dispatch(_saveAutheticatedUser(authenticatedUser));
				} else {
					NotificationService.notifyError(I18n.t('user_actions.login_failed'));
				}
				dispatch(hideLoading());
			});
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/**
 * logout handler
 */
export function logout() {
	return function(dispatch) {
		dispatch(showLoading());
		return SecurityAPI.logout().then(() => {
			NotificationService.notifySuccess(I18n.t('user_actions.logout_success'));
			dispatch(_resetAuthenticatedUser());
			dispatch(hideLoading());
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}


/* ------------------------------ Dispatchers ------------------------------- */
/**
 * Common handler for server errors
 */
function _handleCommonServerErrors(error) {
	let errorMessageCodeHandler = new UserErrorMessageCodeHandler();
	NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
}

/**
 * action for saving the user
 */
function _saveAutheticatedUser(authenticatedUser) {
	return {type: ActionTypes.LOGIN_SUCCESS, authenticatedUser};
}

/**
 * resets the authenticated user after logout
 */

function _resetAuthenticatedUser() {
	return {type: ActionTypes.LOGOUT_SUCCESS};
}