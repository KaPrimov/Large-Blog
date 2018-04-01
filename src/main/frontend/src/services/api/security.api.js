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
	 * get currently logged in user after logged in
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

	/**
	 * checkm, wheather logged in user exists and returns it, if it does
	 */
	static checkLoggedInUser() {
		return RestService.get('user');
	}
}