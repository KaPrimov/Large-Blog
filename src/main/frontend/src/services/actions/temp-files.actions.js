import * as ActionTypes from './action-types.constants';
import TempAPI from '../api/temp-file.api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import TempErrorMessageCodeHandler from '../error-handlers/temp-error-message-code-handler';
import NotificationService from '../../services/services/notification.service';

/* ------------------------------ Public API ------------------------------- */

/**
 * Get version information
 */
export function addTempFile(tempFile) {
	return function(dispatch) {
		dispatch(_addTempFileSuccess(tempFile));
	};
}

/**
 * Moves file from the temp directory to the directory of an article.
 */
export function deleteFile(fileData) {
	return function(dispatch) {
		dispatch(showLoading());
		return TempAPI.deleteArticleFile(fileData).then(() => {
			dispatch(hideLoading());
			dispatch(_deleteFileSuccess(fileData));
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/* ------------------------------ Dispatchers ------------------------------- */

/**
 * Handle error
 */
export function _handleCommonServerErrors(error) {
	let errorMessageCodeHandler = new TempErrorMessageCodeHandler();
	NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
}
/**
 * Load version information successfully
 */
export function _addTempFileSuccess(tempFile) {
	return {type: ActionTypes.ADD_TEMP_FILE_SUCCESS, tempFile};
}

/**
 * Removes file from the article files and the temp files
 */
function _deleteFileSuccess(fileData) {
	return {type:ActionTypes.DELETE_ARTICLE_FILE_SUCCESS, fileData};
}