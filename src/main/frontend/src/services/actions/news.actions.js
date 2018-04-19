import * as ActionTypes from './action-types.constants';
import NewsAPI from '../api/news.api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {ModalService} from '../../services/services/modal.service';
import {I18n} from 'react-redux-i18n';
import NewsErrorMessageCodeHandler from '../../services/error-handlers/news-error-message-code-handler';
import NotificationService from '../../services/services/notification.service';

/**
 * List all news
 */
export function listAllOfMyNews() {
	return function(dispatch) {
		dispatch(showLoading());
		return NewsAPI.listAllOfMyNews().then(news => {
			dispatch(hideLoading());
			dispatch(_loadNewsSuccess(news));
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/**
 * Get single news
 * @param id
 */
export function getSingleNews(id, isFromManagePage) {
	return function(dispatch) {
		dispatch(showLoading());		
		return NewsAPI.getNewsWithId(id).then(news => {
			dispatch(hideLoading());
			dispatch(_loadSingleNewsSuccess(news, isFromManagePage !== undefined ? isFromManagePage : false));
		}).fail(error => {
			dispatch(hideLoading());
			_handleCommonServerErrors(error);
		});
	};
}

/**
 * Get single news
 * @param id
 */
export function getSingleNewsForPublish(id, isFromManagePage) {
	return function(dispatch) {
		dispatch(showLoading());		
		return NewsAPI.getNewsWithId(id).then(news => {
			dispatch(hideLoading());
			news.isForPublish = true;
			dispatch(_loadSingleNewsSuccess(news, isFromManagePage !== undefined ? isFromManagePage : false));
		}).fail(error => {
			dispatch(hideLoading());
			_handleCommonServerErrors(error);
		});
	};
}

/**
 * Get single news
 * @param id
 */
export function getSingleNewsForDetails(id, isFromManagePage) {
	return function(dispatch) {
		dispatch(showLoading());		
		return NewsAPI.getNewsWithId(id).then(news => {
			dispatch(hideLoading());
			news.isForDetails = true;
			dispatch(_loadSingleNewsSuccess(news, isFromManagePage !== undefined ? isFromManagePage : false));
		}).fail(error => {
			dispatch(hideLoading());
			_handleCommonServerErrors(error);
		});
	};
}

/**
 * List all news
 */
export function listCurrentNews(filterCriteria) {
	return function(dispatch) {
		dispatch(showLoading());		
		return NewsAPI.listCurrentNews(filterCriteria).then(news => {
			filterCriteria.hasMoreItems = news.length != 0;
			dispatch(hideLoading());
			dispatch(_appendNewsSuccess(news));
		}).fail(error => {
			dispatch(hideLoading());
			_handleCommonServerErrors(error);
		});
	};
}

/**
 * List news by tag
 */
export function listCurrentNewsByTag(filterCriteria) {
	return function(dispatch) {
		dispatch(showLoading());		
		return NewsAPI.listCurrentNews(filterCriteria).then(news => {
			filterCriteria.hasMoreItems = news.length != 0;
			dispatch(hideLoading());
			dispatch(_appendNewsByTagSuccess(news));
		}).fail(error => {
			dispatch(hideLoading());
			_handleCommonServerErrors(error);
		});
	};
}

/**
 * Delete specific news
 */
export function deleteNews(news) {
	return function(dispatch) {
		ModalService.showConfirm(I18n.t('news_actions.confirm_delete')).then(result => {
			if(result) {
				dispatch(showLoading());				
				NewsAPI.deleteNews(news.id, news.user.id).then(result => {
					if (result) {
						NotificationService.notifySuccess(I18n.t('news_actions.success_delete', {name: news.title}));
						dispatch(_deleteNewsSuccess(news));
						dispatch(hideLoading());
					}
				}).fail(error => {
					_handleCommonServerErrors(error);
					dispatch(hideLoading());
				});
			}  
		});
	};
}

/**
 * Send news type to the editor
 */
export function addNewsType(isRedirecting) {
	return function(dispatch) {
		dispatch(_sendNewsType(isRedirecting));
	};
}

/**
 * marks article as seen when user, different from the creator sees the article
 */
export function markNewsAsSeen(id) {
	return function(dispatch) {
		dispatch(showLoading());
		return NewsAPI.markNewsAsSeen(id).then(() => {
			dispatch(hideLoading());
		}).fail(error => {
			dispatch(hideLoading());
			_handleCommonServerErrors(error);
		});
	};
}

/**
 * Create or update single news
 * @param newsToUpdate 
 */
export function createOrUpdateNews(newsToUpdate) {
	return function(dispatch) {
		dispatch(showLoading());
		return NewsAPI.createOrUpdateNews(newsToUpdate).then(id => {
			dispatch(hideLoading());
			const message = newsToUpdate.id ? I18n.t('news_actions.success_update') : I18n.t('news_actions.success_create');
			NotificationService.notifySuccess(message);
			NewsAPI.getNewsWithId(id).then(currentNews => {
				dispatch(_updateOrCreateNewsSuccess(currentNews, id));
			});
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading(error));
		});
	};
}

/**
 * update metadata for single news
 * @param newsToUpdate 
 */
export function updateMetadataHandler(newsToUpdate) {
	return function(dispatch) {
		dispatch(showLoading());
		return NewsAPI.updateMetadata(newsToUpdate).then(id => {
			dispatch(hideLoading());
			NotificationService.notifySuccess(I18n.t('news_actions.meta_data_updated'));
			NewsAPI.getNewsWithId(id).then(currentNews => {
				dispatch(_updateOrCreateNewsSuccess(currentNews, id));
			});
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading(error));
		});
	};
}

/**
 * Saves image in base64 in the store
 */
export function updateArticleImage(articleImageDTO) {
	return function(dispatch) {
		NotificationService.notifySuccess(I18n.t('news_actions.image_updated'));
		dispatch(_updateArticleImage(articleImageDTO));
	};
}

/**
 * Reset isSave in reducer, if the content is not valid
 */
export function resetIsSave() {
	return function(dispatch) {
		dispatch(_resetIsSave());
	};
}

/**
 * List users which have read a specific article
 */
export function listAllUsersPerArticleSeen(articleId) {
	return function(dispatch) {
		dispatch(showLoading());
		return NewsAPI.listAllUsersPerArticleSeen(articleId).then(usersPerArticle => {
			dispatch(hideLoading());
			dispatch(_loadUsersPerArticleSeenSuccess(usersPerArticle));
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/**
 * Clear store from users per article
 */
export function clearUsersPerArticleSeen() {
	return function(dispatch) {
		dispatch(_loadUsersPerArticleSeenSuccess([]));
	};
}

/**
 * Publish single news
 */
export function publishNews(news) {
	return function(dispatch) {
		dispatch(showLoading());
		
		
		return NewsAPI.publishNews(news.id).then(isPublished => {
			dispatch(hideLoading());
			if (isPublished) {
				NotificationService.notifySuccess(I18n.t('news_actions.news_published'));
			} else {
				NotificationService.notifyWarning(I18n.t('news_actions.news_already_published'));
			}
			dispatch(_newsPublishedSuccessfully());
		}).fail(error => {
			_handleCommonServerErrors(error);
			dispatch(hideLoading());
		});
	};
}

/**
 * Saves news in state
 */
export function saveNewsInState(news) {
	return function(dispatch) {
		dispatch(_saveNewsInState(news));
	};
}

export function clearNewsContent() {
	return function(dispatch) {
		dispatch(_clearNewsContent());
	};
}
/* ------------------------------ Dispatchers ------------------------------- */

/**
 *  Delete specific news successfully
 */
export function _deleteNewsSuccess(news) {
	return {type: ActionTypes.DELETE_NEWS_SUCCESS, news: news};
}

/**
 * Load news successfully
 */
export function _loadNewsSuccess(news) {
	return {type: ActionTypes.LOAD_NEWS_SUCCESS, news: news};
}

/**
 * Load news successfully
 */
export function _appendNewsSuccess(news) {
	return {type: ActionTypes.APPEND_NEWS_SUCCESS, news: news};
}

export function _appendNewsByTagSuccess(news){
	return {type: ActionTypes.APPEND_NEWS_SUCCESS_BY_TAG, news: news};
}

export function _clearNewsContent() {
	return {type: ActionTypes.CLEAR_NEWS_CONTEXT};;
}

/**
 * Handle error
 */
export function _handleCommonServerErrors(error) {
	let errorMessageCodeHandler = new NewsErrorMessageCodeHandler();
	NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
}

/**
 * Send news type to the editor
 */
export function _sendNewsType(isRedirecting) {
	return {type: ActionTypes.ADD_NEWS_TYPE, isRedirecting};
}


/**
 * Saves the data from the newly created news in the store.
 */
export function _saveNewsInState(news) {
	return {type: ActionTypes.SAVE_NEWS_IN_STATE, news};
}

/**
 * Updates the image in the current news' metadata
 */
export function _updateArticleImage(articleImageDTO) {
	return {type: ActionTypes.UPDATE_ARTICLE_IMAGE, image: articleImageDTO};
}

/**
 * Saves the data from the newly created news in the store.
 */
export function _updateOrCreateNewsSuccess(news) {
	return {type:ActionTypes.CREATE_OR_UPDATE_NEWS_SUCCESS, news};
}

/**
 * Reset isSave in reducer, if the content is not valid
 */
export function _resetIsSave() {
	return {type: ActionTypes.RESET_IS_SAVE};
}

/**
 * Loads single news from the database and saves it in the reducer
 */
function _loadSingleNewsSuccess(news, isFromManagePage) {
	return {type: ActionTypes.LOAD_SINGLE_NEWS_SUCCESS, news, isFromManagePage};
}

/**
 * Load users who have successfully read an article
 */
export function _loadUsersPerArticleSeenSuccess(usersPerArticle, articleId){
	return {type:ActionTypes.LOAD_USERS_PER_ARTICLE_SUCCESS, usersPerArticle, articleId};
}

/**
 * Successfully published article
 */
function _newsPublishedSuccessfully() {
	return {type: ActionTypes.NEWS_PUBLISHED_SUCCESS};
}
