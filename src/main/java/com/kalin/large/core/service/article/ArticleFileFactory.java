package com.kalin.large.core.service.article;

import com.proxiad.extranet.core.model.article.Article;
import com.proxiad.extranet.core.model.article.ArticleFile;
import com.proxiad.extranet.core.model.article.beans.ArticleFileDTO;
import com.proxiad.extranet.core.model.news.beans.NewsDTO;

import java.io.File;

/**
 * Factory for {@link ArticleFile} entity
 * 
 * @author Kalin Primov
 */
public interface ArticleFileFactory {
	/**
	 * Create {@link ArticleFile} object from supplied params. 
	 * @param articleFileDTO {@link ArticleFileDTO}
	 * @param article {@link Article}
	 * @return {@link ArticleFile}
	 */
	ArticleFile createEntityFrom(final File savedFile, final Article article);
	
	/**
	 * Create a {@link NewsDTO} from {@link ArticleFile}
	 * @param articleFile {@link ArticleFile}
	 * @return
	 */
	ArticleFileDTO createDTOFrom(final ArticleFile articleFile);
}
