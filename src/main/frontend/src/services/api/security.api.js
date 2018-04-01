import RestService from '../services/rest-service';

export default class SecurityAPI {
	/**
	 * Checks if that login exists
	 */
	static loginExists(username, email) {
		return RestService.get(`loginExists?username=${username}&email=${email}`);
	}

	/**
	 * login
	 */
	static loginUser(userCredentials) {
		return RestService.post(`users/login?username=${userCredentials.username}&password=${userCredentials.password}`);
	}

	/**
	 * get currently logged in user
	 */
	static getLoggedInUser() {
		return RestService.get('successLogin');
	}

	/**
	 * Logout the authenticated user
	 */
	static logout() {
		return RestService.get('logout');
	}
}