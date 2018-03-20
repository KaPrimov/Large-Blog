import * as ActionTypes from '../actions/action-types.constants';
import TransformObjectUtils from '../services/transform-object-utils.service';

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
	case ActionTypes.LOGIN_SUCCESS: {
		let authenticatedUser = action.authenticatedUser;
		if (authenticatedUser != null) {
			authenticatedUser.authorities = TransformObjectUtils.transformAuthorities(authenticatedUser.authorities);
		}
		return authenticatedUser;
	}
	default:
		return state;
	}
}