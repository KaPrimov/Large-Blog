package com.kalin.large.core.service.article;


import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.ArticleFile;
import com.kalin.large.core.model.article.ArticleTag;
import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import com.kalin.large.core.model.article.beans.ArticleImageDTO;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;
import com.kalin.large.core.service.exception.BusinessLogicException;

import java.util.Date;
import java.util.Set;

/**
 * Common {@link Article} service
 * @author Kalin Primov
 */
public interface CommonArticleService {

    /**
     * List all tags per article by its id
     * @param articleId
     * @return {@link Set} of {@link TagDTO}s
     */
    Set<Tag> findAllTagsFor(final Long articleId);
    
    /**
     * Update article's image
     * 
     * @param article
     * @param imageDTO
     * @throws BusinessLogicException
     */
    Long updateArticleImage(final Article article, final ArticleImageDTO imageDTO) throws BusinessLogicException;
    
    /**
     * Get Photo of specific {@link Article}
     * @param articleId
     * @return
     */
    byte[] getArticlePhoto(final Long articleId);
    /**
     * Update all {@link ArticleTag}s
     * @param article
     * @param tagsDTO
     * @throws BusinessLogicException
     */
    void updateArticleTags(final Article article, final ArticleTagDTO[] tagsDTO) throws BusinessLogicException;
    
    /**
     * Validate single article's data
     * 
     * @param article
     * @throws BusinessLogicException
     */
    void validateArticleForPublish(final Article article) throws BusinessLogicException;
    
    /**
     * Update all {@link ArticleFile}s</br>
     * 
     * @param article
     * @param articleFilesDTO
     * @throws BusinessLogicException
     */
    void updateArticleFiles(final Article article, final ArticleFileDTO[] articleFilesDTO) throws BusinessLogicException;

	/**
	 * Updates the start and end date of single news </br>
	 * The start date can not be null
	 * @param article
	 * @param startDate
	 * @param endDate
	 */	
	void updateDates(Article article, Date startDate, Date endDate) throws BusinessLogicException;
	
	/**
	 * Gets the image of a single article, based on the id </br>
	 * @param id
	 * @return image as {@link byte[]}
	 */	
	byte[] getArticleImage(final Long id);
	
	/**
	 * Gets a file for as single article. Based on articleId and articleFileId </br>
	 * @param articleId
	 * @param articleFileId
	 * @return image as {@link byte[]}
	 */	
	byte[] getArticleFile(final Long articleId, final Long articleFileId);

	/**
	 * Finds if file is in the temporary table or in the articleFile table and deletes it
	 * @param articleFileDTO {@link ArticleFileDTO}
	 * @return {@link Boolean}
	 */	
	boolean deleteFile(final ArticleFileDTO articleFileDTO);


	/**
	 * Cancels article with status PUBLISH_PENDING
	 * @param id
	 * @return {@link Boolean}
	 * @throws BusinessLogicException 
	 */
	Boolean cancelPublishing(Long id) throws BusinessLogicException;

	/**
	 * Updates the status of a single article
	 * @param article {@link Article}
	 * @return {@link Boolean}
	 * @throws BusinessLogicException 
	 */
	boolean updateStatus(Article article) throws BusinessLogicException;
}
