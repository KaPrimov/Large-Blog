package com.kalin.large.core.service.news;


import com.kalin.large.core.model.news.News;
import com.kalin.large.core.model.news.beans.NewsDTO;
import com.kalin.large.core.model.news.beans.NewsFilterCriteria;
import com.kalin.large.core.model.user.beans.UserBasicDTO;
import com.kalin.large.core.service.exception.BusinessLogicException;

import java.util.Date;
import java.util.Set;

/**
 * News service
 */
public interface NewsService {
	/*---------------------------------------------------- CONSTANTS --------------------------------------------------*/
	String PRIVILEGE_NEWS_ARTICLES = "news.articles";
	
	/*------------------------------------------------------- API -----------------------------------------------------*/	
	/**
	 * Get ordered list of all articles.
	 * @return {@link Set} of {@link News}s
	 */
	Set<NewsDTO> listAllNewsOfLoggedInUser();
	
	/**
     * Return a {@link News} by its <code>id</code>
     * @param id the identification of a {@link News}
     * @return a {@link NewsDTO} <code>null</code> otherwise
     */
	NewsDTO load(final Long id) throws BusinessLogicException;
	
    /**
     * Delete specific {@link News} by its id
     * @param newsId the id of desired {@link News}
     */
    void deleteNews(final Long newsId) throws BusinessLogicException;
    
    /**
     * List all employees who have read a news by its id
     * @param articleId {@link Long}
     * @return {@link Set} of {@link UserBasicDTO}s
     */
    Set<UserBasicDTO> listSeenByEmployees(final Long articleId);
    
    /**
     * Saves or updates the content of news
     * @param newsDTO {@link NewsDTO}
     * @return newsId {@link Long} of the newly created/updated news
     * @throws BusinessLogicException
     */
    Long saveOrUpdateNewsContent(final NewsDTO newsDTO) throws BusinessLogicException;
    
    /**
     * Modifies only the metadata of the news
	 * @param newsDTO {@link NewsDTO}
     * @return newsId {@link Long} of the news
     * @throws BusinessLogicException
     */
    Long updateNewsMetadata(final NewsDTO newsDTO) throws BusinessLogicException;
    
    /**
     * Publish the given {@link News}
     * @param newsId {@link NewsDTO}
     */
    boolean publish(final Long newsId) throws BusinessLogicException;

	  /**
     * Generate list of news which are published, current (current date is in their range) and which 
     * target groups correspond to the logged user ( either employee or subsidiary target groups)
     */
    Set<NewsDTO> listCurrentNews(NewsFilterCriteria filterCriteria) throws BusinessLogicException;

    /**
     * mark the {@link News} with articleId as seen by the current user who visits it
     * @param newsId the id of the article
     */
	void markNewsAsSeen(final Long newsId);
	
	/**
	 * Publishes all news with status PENDING_PUBLISHING and today's start date
	 * @param currentDate {@link Date}
	 */
	void publishPendingNews(final Date currentDate) throws BusinessLogicException;
}
