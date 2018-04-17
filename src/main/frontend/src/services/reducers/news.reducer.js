import * as ActionTypes from '../actions/action-types.constants';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
	return {
		singleNews: {
			articleFiles: []
		},
		news: [],
		usersPerArticle: [],
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

export function newsReducer(state = initializeStates().news, action) {
	switch(action.type) {
	case ActionTypes.LOAD_NEWS_SUCCESS:
		return action.news;
	case ActionTypes.APPEND_NEWS_SUCCESS:
		return [...state, ...action.news];
	case ActionTypes.APPEND_NEWS_SUCCESS_BY_TAG: 
		return action.news;
	case ActionTypes.DELETE_NEWS_SUCCESS:
		return state.filter(newsElement => newsElement.id !== action.news.id);	
	case ActionTypes.CLEAR_NEWS_CONTEXT:
		return initializeStates().news;
	default:
		return state;
	}
}

export function newsSeenByReducer(state = initializeStates().usersPerArticle, action) {
	switch(action.type) {
	case ActionTypes.LOAD_USERS_PER_ARTICLE_SUCCESS:
		return action.usersPerArticle;
	default:
		return state;
	}
}