import * as ActionTypes from '../actions/action-types.constants';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
	return {
		tags: [],
		suggestedTags: [],
		checkedTags: []
	};
}

export function suggestedTagsReducer(state = initializeStates(), action) {
	switch(action.type) {
	case ActionTypes.LOAD_SUGGESTED_TAGS_SUCCESS:
		return Object.assign({}, state, {suggestedTags: action.suggestedTags});
	case ActionTypes.UPDATE_CHECKED_TAGS_SUCCESS:
		return Object.assign({}, state, {checkedTags: action.checkedTags});
	case ActionTypes.LOAD_SINGLE_NEWS_SUCCESS:
		return Object.assign({}, state, {checkedTags: action.news.tags});
	case ActionTypes.CLEAR_CREATE_TAGS_CONTEXT:
		return initializeStates();
	default:
		return state;
	}
}

export function tagsReducer(state = initializeStates().tags, action) {
	switch(action.type) {
	case ActionTypes.LOAD_TAGS_PER_ARTICLE_SUCCESS:
		return action.tags;
	default:
		return state;
	}
}