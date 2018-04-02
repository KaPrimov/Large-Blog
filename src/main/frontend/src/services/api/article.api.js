import RestService from '../services/rest-service';

export default class NewsAPI {
	
	/**
	 * Finds the path to article's image
	 */
	static getArticlePhotoPathByArticleId(id, hash) {
		if (id === -1) {
			return null;
		}
		if (hash !== undefined && hash != null) {
			return `${Configuration.SERVER_PATH}api/article/${id}/photo?hash=${hash}`;
		}
		return `${Configuration.SERVER_PATH}api/article/${id}/photo`;
	}

	/**
	 * List all tags per article
	 */
	static listAllTagsPerArticle(articleId) {
		return RestService.get(`api/article/${articleId}/tags`);
	}

	static cancelPublishing(articleId) {
		return RestService.put(`api/article/${articleId}/cancel-publish`);
	}

}