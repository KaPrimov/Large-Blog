import RestService from '../services/rest-service';

export default class NewsAPI {
	/**
	 * Delete news by Id 
	 */
	static deleteNews(newsId, employeeId) {
		return RestService.delete(`api/news/${newsId}?employeeId=${employeeId}`);
	}

	/**
	 * List all of my news 
	 */
	static listAllOfMyNews() {
		return RestService.get('api/news');
	}

	/**
	 * List current news 
	 */
	static listCurrentNews(filterCriteria) {
		return RestService.post('api/news/current', filterCriteria);
	}

	
	/**
	 * List employees who have read an article
	 */
	static listAllEmployeesPerArticleSeen(articleId) {
		return RestService.get(`api/news/seen-by/${articleId}`);
	}

	/**
	 * Marks notification as seen
	 */
	static markNewsAsSeen(id) {
		return RestService.post('api/news/mark-as-seen', id);
	}

	/**
	 * Create news
	 */
	static createOrUpdateNews(news) {
		return RestService.post('api/news/store', news);
	}

	/**
	 * Update the picture of a single news
	 */
	static updateArticleImage(articleImage) {
		return RestService.put(`api/news/${articleImage.id}/image`, articleImage);
	}

	/**
	 * Update a single news
	 */
	static updateNews(id, news) {
		return RestService.put('api/news/store', news);
	}

	/**
	 * Updates the metadata of a news
	 */
	static updateMetadata(news) {
		return RestService.put('api/news/update', news);
	}

	/**
	 * Find single news with the given id
	 */
	static getNewsWithId(id) {
		return RestService.get(`api/news/${id}`);
	}

	static publishNews(id) {
		return RestService.put('api/news/publish/' + id);
	}
}