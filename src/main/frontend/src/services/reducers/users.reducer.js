import * as ActionTypes from '../actions/action-types.constants';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
	return {
		users: [],
		user: {},
		userRoles: []
	};
}
export function usersReducer(state = initializeStates().users, action) {
	switch(action.type) {
	case ActionTypes.USERS_FETCHED_SUCCESS:
		return action.users;
	case ActionTypes.CLEAR_USERS_CONTEXT:
		return initializeStates().users;
	default:
		return state;
	}
}

export function userReducer(state = initializeStates().user, action) {
	switch(action.type) {
	case ActionTypes.SAVE_USER_IN_STORE:
		return action.user;
	case ActionTypes.CLEAR_USER_CONTEXT:
		return initializeStates().user;
	default:
		return state;
	}
}

export function userRolesReducer(state = initializeStates().userRoles, action) {
	switch(action.type) {
	case ActionTypes.LOAD_USER_ROLES_SUCCESS:
		return action.roles;
	case ActionTypes.CLEAR_USER_ROLES_CONTEXT:
		return initializeStates().userRoles;
	default:
		return state;
	}
}