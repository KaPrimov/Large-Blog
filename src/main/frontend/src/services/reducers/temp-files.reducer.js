import * as ActionTypes from '../actions/action-types.constants';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
	return {
		tempFiles: [],
		deletedFiles: []
	};
}

export function tempFilesReducer(state = initializeStates().tempFiles, action) {
	switch(action.type) {
	case ActionTypes.ADD_TEMP_FILE_SUCCESS:
		return [...state, action.tempFile];
	case ActionTypes.CLEAR_TEMP_FILES_CONTEXT:
		return initializeStates().tempFiles;
	case ActionTypes.DELETE_ARTICLE_FILE_SUCCESS:
		return state.filter(file => file.tempFileUploadId !== action.fileData.tempFileUploadId);
	case ActionTypes.MARK_FILE_FOR_DELETE_SUCEESS:
		return state.filter(file => file.tempFileUploadId !== action.articleFileDTO.tempFileUploadId);
	case ActionTypes.CREATE_OR_UPDATE_NEWS_SUCCESS:
		return action.news.articleFiles;
	default:
		return state;
	}
}

export function deletedFilesReducer(state = initializeStates().deletedFiles, action) {
	switch(action.type) {
	case ActionTypes.MARK_FILE_FOR_DELETE_SUCEESS:
		return [...state, action.articleFileDTO];
	case ActionTypes.CLEAR_TEMP_FILES_CONTEXT:
	case ActionTypes.CREATE_OR_UPDATE_NEWS_SUCCESS:
	case ActionTypes.CREATE_OR_UPDATE_REGULATION_SUCCESS:
		return initializeStates().deletedFiles;
	default:
		return state;
	}
}