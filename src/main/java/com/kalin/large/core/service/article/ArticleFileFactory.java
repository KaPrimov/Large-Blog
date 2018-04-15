package com.kalin.large.core.service.article;


import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.ArticleFile;
import com.kalin.large.core.model.article.beans.ArticleFileDTO;

import java.io.File;

/**
 * Factory for {@link ArticleFile} entity
 * 
 * @author Kalin Primov
 */
public interface ArticleFileFactory {
	/**
	 * Create {@link ArticleFile} object from supplied params. 
	 * @param savedFile {@link File}
	 * @param article {@link Article}
	 * @return {@link ArticleFile}
	 */
	ArticleFile createEntityFrom(final File savedFile, final Article article);
	
	/**
	 * Create a {@link ArticleFileDTO} from {@link ArticleFile}
	 * @param articleFile {@link ArticleFile}
	 * @return ArticleFileDTO
	 */
	ArticleFileDTO createDTOFrom(final ArticleFile articleFile);
}
