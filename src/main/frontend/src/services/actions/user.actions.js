import * as ActionTypes from './action-types.constants';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import UserAPI from '../api/user.api';
import NotificationService from '../../services/services/notification.service';
import UserErrorMessageCodeHandler from '../error-handlers/user-error-handler';


/* ------------------------------ Public API ------------------------------- */

/**
 * List all active user loaded only with their main data
 */
export function registerUser(userData) {
    console.log('action');
	return function(dispatch) {
		dispatch(showLoading());
		return UserAPI.registerUser(userData).then(isRegistered => {
			dispatch(hideLoading());
			dispatch(_registerUser(isRegistered));
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
export function _handleCommonServerErrors(error) {
	let errorMessageCodeHandler = new UserErrorMessageCodeHandler();
	NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
}

function _registerUser(isRegistered) {
	return {type: ActionTypes.USER_REGISTERED, isRegistered};
}