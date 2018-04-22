import RestService from '../services/rest-service';

export default class UserAPI {
	/**
     * register user
     */

	static registerUser(userData) {
		return RestService.post('api/users/register', userData);
	}

	/**
	 * get all users
	 */
	static getAllUsers() {
		return RestService.get('api/users');
	}

	/**
	 * Update user roles
	 */
	static updateUserRoles(userRoles) {
		return RestService.put(`api/users/${userRoles.id}/roles`, userRoles);
	}

	/**
	 * List all user roles
	 */
	static listUserRoles(id) {
		return RestService.get(`api/users/${id}/roles`);
	}
}