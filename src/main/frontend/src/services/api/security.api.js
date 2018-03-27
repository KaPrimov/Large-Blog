import RestService from '../services/rest-service';

export default class SecurityAPI {
    /**
	 * Check that login exists
	 */
	static loginExists(username, email) {
		return RestService.get(`api/loginExists?username=${username}&email=${email}`);
	}
}