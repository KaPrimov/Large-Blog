import * as ActionTypes from './action-types.constants';
import ArticleAPI from '../api/article.api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import NewsErrorMessageCodeHandler from '../../services/error-handlers/news-error-message-code-handler';
import NotificationService from '../../services/services/notification.service';
import {I18n} from 'react-redux-i18n';

/**
 * List all tags for areticle
 */
export function listAllTagsPerArticle(articleId) {
	return function(dispatch) {
		dispatch(showLoading());
		return ArticleAPI.listAllTagsPerArticle(articleId).then(tags => {
			dispatch(hideLoading());
			dispatch(_loadTagsPerArticleSuccess(tags, articleId));
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/**
 * Moves file from the temp directory to the directory of an article.
 */
export function moveTempFiles(tempFilesIds) {
	return function(dispatch) {
		dispatch(showLoading());
		return ArticleAPI.moveTempFiles(tempFilesIds).then(() => {
			dispatch(hideLoading());
			dispatch(_moveTempFilesSuccess());
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/**
 * Moves file for deletion.
 */
export function markFileForDelete(articleFileDTO) {
	return function(dispatch) {
		dispatch(_markFileForDeleteSuccess(articleFileDTO));
	};
}

/**
 * Changes last active tab.
 */
export function changeTab(activeTab) {
	return function(dispatch) {
		dispatch(_changeLastActiveTab(activeTab));
	};
}

/**
 * Cancels the future publishing of any type of article
 */

export function cancelFuturePublishing(articleId) {
	return function(dispatch) {
		dispatch(showLoading());
		return ArticleAPI.cancelPublishing(articleId).then(isCanceled => {
			dispatch(hideLoading());
			if (isCanceled) {
				NotificationService.notifySuccess(I18n.t('news_actions.publish_canceled'));
			} else {
				NotificationService.notifyWarning('news_actions.publish_already_canceled');
			}
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
	let errorMessageCodeHandler = new NewsErrorMessageCodeHandler();
	NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
}

/**
 * Load tags per article successfully
 */
function _loadTagsPerArticleSuccess(tags, articleId){
	return {type:ActionTypes.LOAD_TAGS_PER_ARTICLE_SUCCESS, tags, articleId};
}

/**
 * Moves file from the temp files to the current article saved in the state.
 */
function _moveTempFilesSuccess() {
	return {type:ActionTypes.MOVE_TEMP_FILES_SUCCESS};
}

/**
 * Marks image as deleted
 */
function _markFileForDeleteSuccess(articleFileDTO) {
	return {type: ActionTypes.MARK_FILE_FOR_DELETE_SUCEESS, articleFileDTO};
}

function _changeLastActiveTab(activeTab) {
	return {type: ActionTypes.CHANGE_LAST_ACTIVE_TAB, activeTab};
}
