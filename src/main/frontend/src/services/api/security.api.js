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
}