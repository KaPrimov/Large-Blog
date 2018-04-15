package com.kalin.large.core.service.tag;


import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.ArticleTag;
import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;

import java.util.Collection;

/**
 * Manages Tag entity
 */
public interface TagFactory {

	/**
	 * Create {@link ArticleTag} from supplied parameters
	 * @param tag {@link Tag}
	 * @param article {@link Article}
	 * @return ArticleTag
	 */
	ArticleTag createFrom(Tag tag, Article article);
	/**
	 * Create {@link Tag} from supplied parameters
	 * @param title {@link String}
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
