import RestService from '../services/rest-service';

export default class SecurityAPI {
	/**
	 * Checks if that login exists
	 */
	static loginExists(username, email) {
		return RestService.get(`api/loginExists?username=${username}&email=${email}`);
	}

	/**
	 * login
	 */
	static loginUser(userCredentials) {
		return RestService.post('login', userCredentials);
	}
}