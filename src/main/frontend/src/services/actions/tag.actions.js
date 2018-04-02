import * as ActionTypes from './action-types.constants';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import TagApi from '../api/tag.api.js';

/**
 * List all tags for a givent key word.
 * Used for the autocomplete logic
 */
export function listAllTagsForKeyword(keyWord) {
	return function(dispatch) {
		dispatch(showLoading());
		return TagApi.listAllForKeyword(keyWord).then(suggestedTags => {
			dispatch(hideLoading());
			dispatch(_loadTagsForKeywordSuccess(suggestedTags));
		}).fail(() => {
			dispatch(hideLoading());
		});
	};
}
export function updateSelectedTags(checkedTags) {
	return function(dispatch) {
		dispatch(_updateCheckedTags(checkedTags));
	};
}

/* ------------------------------ Dispatchers ------------------------------- */

/**
 * Dispatch actions and save data in tag's state
 */
function _loadTagsForKeywordSuccess(suggestedTags) {
	return {type: ActionTypes.LOAD_SUGGESTED_TAGS_SUCCESS, suggestedTags};
}

/**
 * Updates the choosen tags
 * @param {Array} checkedTags 
 */
function _updateCheckedTags(checkedTags) {
	return {type: ActionTypes.UPDATE_CHECKED_TAGS_SUCCESS, checkedTags};
}
