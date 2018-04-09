package com.kalin.large.core.service.tag;

import com.proxiad.extranet.core.model.article.Article;
import com.proxiad.extranet.core.model.article.ArticleTag;
import com.proxiad.extranet.core.model.article.Tag;
import com.proxiad.extranet.core.model.article.beans.ArticleTagDTO;
import com.proxiad.extranet.core.model.interest.EmployeeInterest;

import java.util.Collection;

/**
 * Created on 12.12.2017 г.
 *
 * @author Kalin Primov
 */
public interface TagFactory {
	
	/**
	 * Create {@link EmployeeInterest} from supplied parameters
	 * @param tag
	 * @param article
	 * @return {@link ArticleTag}
	 */
	ArticleTag createFrom(final Tag tag, final Article article);
	
	
	/**
	 * Create {@link Tag} from supplied parameters
	 * @param namr
	 * @return {@link Tag}
	 */
	Tag createFrom(final String title);
	
	/**
	 * Creates array of articleTagDTOs
	 * @param tags
	 * @return @{ArticleTag[]}
	 */
	ArticleTagDTO[] createArticleTagDTOsFromCollection(Collection<ArticleTag> tags);
}
