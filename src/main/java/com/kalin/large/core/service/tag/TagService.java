package com.kalin.large.core.service.tag;

import com.proxiad.extranet.core.model.article.Tag;
import com.proxiad.extranet.core.model.article.beans.ArticleTagDTO;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Set;

/**
 * Tag service manages {@link Tag} entity and its primary data
 * 
 * @author Kalin Primov 
 *
 */
public interface TagService {
	
	/**
	 * Search for tags containing given string and returns set with all matches.
	 * @param tagName
	 * @return {@link Set<ArticleTagDTO>}
	 */
	Set<ArticleTagDTO> searchArticleTagByName(String tagName);
	
	/**
	 * Finds tag by its name
	 * @param tagName
	 * @return {@link Tag}
	 */
	Tag getTagByName(String tagName);
	
	/**
	 * Create {@link Set} of {@link Tag}s 
	 * @param {@link Set} of {@link ArticleTagDTO}s articleTagDTO
	 * @return {@link Tag}
	 * @throws DataIntegrityViolationException
	 */
	Set<Tag> createTag(final ArticleTagDTO[] tagsDTO) throws DataIntegrityViolationException;
}
