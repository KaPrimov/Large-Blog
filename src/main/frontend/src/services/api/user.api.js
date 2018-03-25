import RestService from '../services/rest-service';

export default class UserAPI {
	/**
     * register user
     */

	static registerUser(userData) {
		return RestService.post('api/users/register', userData);
	} 
}