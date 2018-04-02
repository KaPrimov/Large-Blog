import RestService from '../services/rest-service';

export default class TempAPI {
	/**
	 * Upload file to the temp directory
	 */
	static uploadTempFile(file) {
		const properties = {
			cache: false,
			processData: false,
		};

		return RestService.postWithCustomProperties('api/temp/', file, properties, false);
	}	
	/**
	 * deletes temp file
	 */
	static deleteArticleFile(articleFileDTO) {
		return RestService.delete('api/temp/delete/', {}, 'application/json', articleFileDTO);
	}
}
