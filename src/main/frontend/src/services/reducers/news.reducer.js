import * as ActionTypes from '../actions/action-types.constants';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
	return {
		singleNews: {},
	};
}

export function singleNewsReducer(state = initializeStates().singleNews, action) {
	switch(action.type) {
	case ActionTypes.CREATE_OR_UPDATE_NEWS_SUCCESS:
	case ActionTypes.LOAD_SINGLE_NEWS_SUCCESS: 
		return action.news;
	case ActionTypes.UPDATE_ARTICLE_IMAGE:
		return {
			...state,			
			image: action.image
		};
	case ActionTypes.ADD_TEMP_FILE_SUCCESS:
		return{
			...state,			
			articleFiles: [...state.articleFiles, action.tempFile]
		};
	case ActionTypes.CLEAR_CREATE_NEWS_CONTEXT:
		return initializeStates().singleNews;
	default:
		return state;
	}
}