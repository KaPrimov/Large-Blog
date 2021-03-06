import * as ActionTypes from '../actions/action-types.constants';
// import TransformObjectUtils from '../services/transform-object-utils.service.js';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
	return {
		authenticatedUser: null,
	};
}

export function authenticatedUserReducer(state = initializeStates().authenticatedUser, action) {
	switch(action.type) {
	case ActionTypes.LOGIN_SUCCESS:
		return action.authenticatedUser;
	case ActionTypes.LOGOUT_SUCCESS: 
		return initializeStates().authenticatedUser;
	default:
		return state;
	}
}