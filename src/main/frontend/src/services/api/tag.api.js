import RestService from '../services/rest-service';

export default class TagAPI {
	
    /**
     * returns and array with all tags, which contain the keyword
     * @param {*string} keyword 
     */
	static listAllForKeyword(keyword) {
		return RestService.get(`api/tags/search?keyWord=${keyword}`);
	}
}