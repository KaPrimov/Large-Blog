import * as ActionTypes from './action-types.constants';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import UserAPI from '../api/user.api';
import NotificationService from '../../services/services/notification.service';
import UserErrorMessageCodeHandler from '../error-handlers/user-error-handler';
import {I18n} from 'react-redux-i18n';


/* ------------------------------ Public API ------------------------------- */

/**
 * List all active user loaded only with their main data
 */
export function registerUser(userData) {
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

/**
 * returns all users for administration purposes
 */
export function getAllUsers() {
	return function(dispatch) {
		dispatch(showLoading());
		return UserAPI.getAllUsers().then(users => {
			dispatch(hideLoading());
			dispatch(_saveAllUsers(users));
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

export function saveUserInStore(user) {
	return function(dispatch) {
		dispatch(_saveUserInStore(user));
	};
}

/**
 * Update employee's roles
 */
export function updateUserRoles(userRoles) {
	return function(dispatch) {
		dispatch(showLoading());
		return UserAPI.updateUserRoles(userRoles).then(id => {
			dispatch(hideLoading());
			NotificationService.notifySuccess(I18n.t('employee_actions.update_employee_roles_success', {firstName: userRoles.firstName, lastName: userRoles.lastName}));
			dispatch(listUserRoles(id));
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading(error));
		});
	};
}

/**
 * List all roles of an user
 */
export function listUserRoles(id) {
	return function(dispatch) {
		dispatch(showLoading());
		return UserAPI.listUserRoles(id).then(userRoles => {
			dispatch(hideLoading());
			dispatch(_loadUserRolesSuccess(userRoles));
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

/**
 * load roles
 */
function _loadUserRolesSuccess(roles) {
	return {type: ActionTypes.LOAD_USER_ROLES_SUCCESS, roles};
}

/**
 * Used for registering user
 * @param {boolean} isRegistered 
 */
function _registerUser(isRegistered) {
	return {type: ActionTypes.USER_REGISTERED, isRegistered};
}

function _saveAllUsers(users) {
	return {type: ActionTypes.USERS_FETCHED_SUCCESS, users};
}

function _saveUserInStore(user) {
	return {type: ActionTypes.SAVE_USER_IN_STORE, user};
}